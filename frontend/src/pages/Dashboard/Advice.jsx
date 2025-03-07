import { useState, useEffect } from "react";
import axios from "axios";
import {toast} from "sonner";

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

const TrackingProgress = ({ selectedService, formData,onReset }) => {
  const [status,setStatus] = useState("pending");
  const getServices = async()=>{
    try {
      const res = await axios.get("http://localhost:3000/api/advice/allservices");
      const services = res.data.contact;
      const service = services.find((s)=>s.service.toLowerCase()=== selectedService.toLowerCase());
      console.log("services:",service);
      
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
  },[selectedService]);

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mt-4">
      <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
      <div className="flex justify-between items-center border p-4 rounded-md">
        <div className="w-1/2">
          <h3 className="font-bold text-lg">{selectedService}</h3>
          
          {formData?.message && (
             <p className="text-gray-600 text-sm truncate w-64">
               {formData.message.length > 100 ? formData.message.substring(0, 100) + "..." : formData.message}
             </p>
          )}

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

const ContactForm = ({ service, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = new FormData();

    newFormData.append("service",service);
    newFormData.append("name", formData.name);
    newFormData.append("email", formData.email);
    newFormData.append("message", formData.message);
  
    if (service === "Resume Review" && formData.resume) {
      newFormData.append("resume", formData.resume);
    }
  
    if (extraFields[service]) {
      if (Array.isArray(extraFields[service])) {
        extraFields[service].forEach((field) => {
          newFormData.append(field.name, formData[field.name] || "");
        });
      } else if (extraFields[service].type && extraFields[service].type !== "file") {
        newFormData.append(extraFields[service].name, formData[extraFields[service].name] || "");
      }
    }
  
    try {
      await onSubmit(service, newFormData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{service}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} className="w-full p-2 border rounded" required />

        {extraFields[service] &&
          (Array.isArray(extraFields[service]) ? (
            extraFields[service].map((field, index) => (
              <div key={index}>
                <label className="block text-gray-700">{field.label}</label>
                <input name={field.name} type={field.type} onChange={handleChange} className="w-full p-2 border rounded" required />
              </div>
            ))
          ) : extraFields[service].type === "select" ? (
            <div>
              <label className="block text-gray-700">{extraFields[service].label}</label>
              <select name={extraFields[service].name} onChange={handleChange} className="w-full p-2 border rounded" required>
                {extraFields[service].options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-gray-700">{extraFields[service].label}</label>
              <input name={extraFields[service].name} type={extraFields[service].type} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
          ))}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

const Advice = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [requests, setRequests] = useState({});

  // useEffect(() => {
  //   const savedRequests = localStorage.getItem("requests");
  //   if (savedRequests) {
  //     setRequests(JSON.parse(savedRequests));
  //   }
  // }, []);

  const handleFormSubmit = async (service, data) => {
    console.log("service",service);
    console.log("message",data.message);
    
    
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-1/4 bg-white p-4 shadow-md fixed left-0 h-full">
        <h2 className="text-xl font-semibold mb-4">Services</h2>
        <ul>
          {services.map((service) => (
            <li key={service.name} className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white rounded-md" onClick={() => setSelectedService(service.name)}>
              {service.icon} {service.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="ml-[25%] flex-1 p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Book a Session</h1>
        <p>Select Service</p>
        {requests[selectedService] ? (
          <TrackingProgress selectedService={selectedService} formData={requests[selectedService].formData} status={requests[selectedService].status} onReset={() => handleReset(selectedService)} />
        ) : (
          selectedService && <ContactForm service={selectedService} onSubmit={handleFormSubmit} />
        )}
      </main>
    </div>
  );
};

export default Advice;