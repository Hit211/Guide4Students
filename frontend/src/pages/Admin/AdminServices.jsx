import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/advice/allservices"); 
        setServices(res.data.contact);
      } catch (error) {
        toast.error("Failed to fetch services");
        console.log(error);
      }
    };

    fetchServices();
  }, []);

  const updateStatus = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/advice/${id}/status`, { status: "completed" });
      setServices((prev) =>
        prev.map((service) =>
          service._id === id ? { ...service, status: "completed" } : service
        )
      );
      toast.success("Service marked as completed");
    } catch (error) {
      toast.error("Failed to update status");
      console.log(error);
    }
  };

  const deleteServices = async(id)=>{
    try {
      await axios.delete(`http://localhost:3000/api/advice/${id}/delete`);
      setServices((prev)=>
      prev.filter((service)=>
      service._id!==id))
    } catch (error) {
      toast.error("Failed to delete",error);
    }
  }

  const pendingServices = services.filter((service) => service.status === "pending");
  const completedServices = services.filter((service) => service.status === "completed");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-red-500">Pending Services</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Service</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingServices.length > 0 ? (
                pendingServices.map((service) => (
                  <tr key={service._id} className="border">
                    <td className="border px-4 py-2">{service.name}</td>
                    <td className="border px-4 py-2">{service.email}</td>
                    <td className="border px-4 py-2">{service.service}</td>
                    <td className="border px-4 py-2">{service.message}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => updateStatus(service._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Mark Completed
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No pending services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

     
      <div>
        <h3 className="text-xl font-semibold mb-2 text-green-500">Completed Services</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Service</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {completedServices.length > 0 ? (
                completedServices.map((service) => (
                  <tr key={service._id} className="border">
                    <td className="border px-4 py-2">{service.name}</td>
                    <td className="border px-4 py-2">{service.email}</td>
                    <td className="border px-4 py-2">{service.service}</td>
                    <td className="border px-4 py-2">{service.message}</td>
                    <td className="border px-4 py-2 text-green-500 font-bold">Completed</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => deleteServices(service._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No completed services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminServices;
