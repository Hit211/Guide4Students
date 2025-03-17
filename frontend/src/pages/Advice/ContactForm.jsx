import { useState } from "react";

const ContactForm = ({ service, onSubmit,  extraFields }) => {
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


  export default ContactForm;