import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {toast} from "sonner";
import Reviewer from "./Reviewer";
import { Menu,X } from "lucide-react";
import styles from "./advice.module.css";

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
  "Mock Interview": { type: "datetime-local", label: "Select Date & Time", name: "interviewDateTime" },
  "Discovery Call": { type: "datetime-local", label: "Select Date & Time", name: "discoveryCallDateTime" },
  "1:1 Mentorship (Career Guidance)": { type: "text", label: "Preferred Topics", name: "mentorshipTopics" },
  "Interview Prep & Tips": [
    { type: "text", label: "Which topics do you need tips on?", name: "prepTopics" },
    { type: "number", label: "How many topics have you learned in this area?", name: "topicsLearned" },
  ],
  "Priority Messages": {
    type: "select",
    label: "Urgency Level",
    name: "urgency",
    options: ["Low", "Medium", "High", "Critical"],
  },
};

const TrackingProgress = ({ selectedService,onReset }) => {
  const [status,setStatus] = useState("pending");
  const getServices = async()=>{
    try {
      const res = await axios.get("http://localhost:3000/api/advice/allservices");
      const services = res.data.contact;
      const service = services.find((s)=>s.service.toLowerCase()=== selectedService.toLowerCase());
      if(service){
        setStatus(service.status);
      }else{
        setStatus("pending");
      }
    } catch (error) {
        toast.error(error.message);
    }
  }

  useEffect(()=>{
     getServices();
  },[]);

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mt-4">
      <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
      <div className="flex justify-between items-center border p-4 rounded-md">
        <div className="w-1/2">
          <h3 className="font-bold text-lg">{selectedService}</h3>
{/*           
          {formData?.message && (
             <p className="text-gray-600 text-sm truncate w-64">
               {formData.message.length > 100 ? formData.message.substring(0, 100) + "..." : formData.message}
             </p>
          )} */}

        </div>
        <div className="w-1/2 flex items-center justify-end">
          <span className={`px-4 py-2 rounded ${status === "completed" ? "bg-green-500" : "bg-yellow-500"} text-white`}>
            {status}
          </span>
        </div>
      </div>
      {status === "completed" && (
        <button onClick={onReset} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Start New Request
        </button>
      )}
    </div>
  );
};

const Advice = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [requests, setRequests] = useState({});
  const [menuOpen,setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  // useEffect(() => {
  //   const savedRequests = localStorage.getItem("requests");
  //   if (savedRequests) {
  //     setRequests(JSON.parse(savedRequests));
  //   }
  // }, []);

  const handleFormSubmit = async (service, data) => {
    if (!service || !data.get("message")) {
      toast.error("Service and message are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/advice/send", data,{
        headers: { "Content-Type":"multipart/form-data"},
      });
      const result = response.data;
      if (result.success) {
        toast.success("Your request has been sent successfully!");
        const updatedRequests = { ...requests, [service]: { formData: data, status: "pending" } };
        setRequests(updatedRequests);
      } else {
        toast.error(result.error || "Failed to send request. Please try again.");
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

  const handleService=(value)=>{
    setSelectedService(value);
    setMenuOpen(false);
  }

  const handleWrapClick = (event)=>{
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 relative" onClick={handleWrapClick}>
       {!menuOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(true)}}
        >
          <Menu size={20} />
        </button>
      )}

<aside
  ref={sidebarRef}
  className={`bg-white p-4 shadow-md fixed left-0 min-h-screen w-64 z-50 transition-transform duration-300 md:translate-x-0 ${
    menuOpen ? "translate-x-0" : "-translate-x-full"
  } md:w-1/4 md:relative`}
  onClick={(e) => e.stopPropagation()}
>
  <div className="md:hidden flex justify-end">
    <button className="p-2" onClick={() => setMenuOpen(false)}>
      <X size={20} />
    </button>
  </div>
  <h2 className="text-xl font-semibold mb-4">Services</h2>
  <ul>
    {services.map((service) => (
      <li
        key={service.name}
        className={`p-2 cursor-pointer rounded-md ${
          selectedService === service.name ? "bg-gray-500 border-green-400 text-white" : ""
        }`}
        onClick={() => handleService(service.name)}
      >
        {service.icon} {service.name}
      </li>
    ))}
  </ul>
</aside>

<main className={`${styles["main-container"]} p-6 ml-[12px]`}>
  <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Book a Session</h1>
  {!selectedService && <p className="text-lg text-gray-600">Please select a service from the sidebar to proceed.</p>}
  {requests[selectedService] ? (
    <TrackingProgress
      selectedService={selectedService}
      formData={requests[selectedService].formData}
      status={requests[selectedService].status}
      onReset={() => handleReset(selectedService)}
    />
  ) : (
    selectedService && <Reviewer service={selectedService} extraFields={extraFields} onSubmit={handleFormSubmit} />
  )}
</main>

    </div>
  );
};

export default Advice;