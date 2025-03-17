import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteService, fetchServices, updateStatus } from "../../redux/serviceSlice";

const AdminServices = () => {
  const {services,loading,error} = useSelector((state)=>state.service);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchServices());
  },[dispatch]);

  const handleUpdateStatus = (id)=>{
    dispatch(updateStatus(id));
  }

  const handleDeleteServices = async(id)=>{
    dispatch(deleteService(id));
  }

  const pendingServices = services.filter((service) => service.status === "pending");
  const completedServices = services.filter((service) => service.status === "completed");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
    
      {loading && <p className="text-center">🥶</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

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
                        onClick={() => handleUpdateStatus(service._id)}
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
                        onClick={() => handleDeleteServices(service._id)}
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
