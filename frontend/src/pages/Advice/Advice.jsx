import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import Reviewer from "./Reviewer";
import { Menu, X } from "lucide-react";
import styles from "./advice.module.css";
import TrackingProgress from "./TrackingProgress";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const services = [
  { name: "Ask Me Anything", icon: "💡" },
  { name: "Priority Messages", icon: "📩" },
  { name: "Discovery Call", icon: "📞" },
  { name: "1:1 Mentorship (Career Guidance)", icon: "👨‍🏫" },
  { name: "Resume Review", icon: "📄" },
  { name: "Mock Interview", icon: "🎤" },
  { name: "Interview Prep & Tips", icon: "📝" },
];

const extraFields = {
  "Resume Review": { type: "file", label: "Upload Resume", name: "resume" },
  "Mock Interview": {
    type: "datetime-local",
    label: "Select Date & Time",
    name: "interviewDateTime",
  },
  "Discovery Call": {
    type: "datetime-local",
    label: "Select Date & Time",
    name: "discoveryCallDateTime",
  },
  "1:1 Mentorship (Career Guidance)": {
    type: "text",
    label: "Preferred Topics",
    name: "mentorshipTopics",
  },
  "Interview Prep & Tips": [
    {
      type: "text",
      label: "Which topics do you need tips on?",
      name: "prepTopics",
    },
    {
      type: "number",
      label: "How many topics have you learned in this area?",
      name: "topicsLearned",
    },
  ],
  "Priority Messages": {
    type: "select",
    label: "Urgency Level",
    name: "urgency",
    options: ["Low", "Medium", "High", "Critical"],
  },
};
const Advice = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [requests, setRequests] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const userId = useSelector((state) => state.auth.user?._id);

  // useEffect(() => {
  //   const savedRequests = localStorage.getItem("requests");
  //   if (savedRequests) {
  //     setRequests(JSON.parse(savedRequests));
  //   }
  // }, []);

  const { service } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (service) {
      setSelectedService(formatServiceName(service));
    }
  }, [service]);

  const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

  const formatServiceName = (slug) => {
    const match = services.find((service) => slugify(service.name) === slug);
    return match ? match.name : null;
  };

  const handleFormSubmit = async (service, data) => {
    if (!service || !data.get("message")) {
      toast.error("Service and message are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/advice/send",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const result = response.data;
      if (result.success) {
        toast.success("Your request has been sent successfully!");
        const updatedRequests = {
          ...requests,
          [service]: { formData: data, status: "pending" },
        };
        setRequests(updatedRequests);
      } else {
        toast.error(
          result.error || "Failed to send request. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleReset = (service) => {
    const updatedRequests = { ...requests };
    delete updatedRequests[service];
    setRequests(updatedRequests);
  };

  const handleService = (value) => {
    setSelectedService(value);
    setMenuOpen(false);
    navigate(`/dashboard/advice/${slugify(value)}`);
  };

  const handleWrapClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };
  return (
    <div
      className="flex min-h-screen bg-gray-100 relative"
      onClick={handleWrapClick}
    >
      {!menuOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(true);
          }}
        >
          <Menu size={20} />
        </button>
      )}
      <aside
        ref={sidebarRef}
        className={`bg-white p-4 shadow-md fixed left-0 min-h-screen w-64 z-50 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-1/4 md:relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:hidden flex justify-end">
          <button
            className="p-2 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Services</h2>
        <ul>
          {services.map((service) => (
            <li
              key={service.name}
              className={`p-2 cursor-pointer rounded-md ${
                selectedService === service.name
                  ? "bg-gray-500 border-green-400 text-white"
                  : ""
              }`}
              onClick={() => handleService(service.name)}
            >
              {service.icon} {service.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className={`${styles["main-container"]} p-6 ml-[12px]`}>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Book a Session
        </h1>
        {!selectedService && (
          <p className="text-lg text-gray-600">
            Please select a service from the sidebar to proceed.
          </p>
        )}
        {requests[selectedService] ? (
          <TrackingProgress
            userId={userId}
            selectedService={selectedService}
            formData={requests[selectedService].formData}
            status={requests[selectedService].status}
            onReset={() => handleReset(selectedService)}
          />
        ) : (
          selectedService && (
            <Reviewer
              service={selectedService}
              extraFields={extraFields}
              onSubmit={handleFormSubmit}
            />
          )
        )}
      </main>
    </div>
  );
};

export default Advice;
