
import { Loader2 } from "lucide-react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchMentors, updateAvailability } from "../../redux/mentorSlice";

const AdminMentor = () => {
  const dispatch = useDispatch();
  const {mentors,loading} = useSelector((state)=>state.mentor);

  useEffect(()=>{
    dispatch(fetchMentors());
  },[dispatch]);
 
  return (
   loading? (
    <Loader2/>
   ):(
    <div className="p-3">
     <h1 className="bg-gray-300 mb-2 text-center h-full">Create Admin:-</h1>
    <div className="h-[500px] bg-gray-500 w-full p-2">   
    </div>

    <div className="overflow-x-hidden mt-3 text-center">
      <h1 className="w-full bg-gray-300 mb-2">All Mentors:-</h1>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Service</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">MentorShipProvided</th>
                <th className="border px-4 py-2">Rating</th>
                <th className="border px-4 py-2 w-[155px]">Available</th>
                <th className="border px-4 py-2 w-[155px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mentors.length > 0 ? (
                mentors.map((mentors) => (
                  <tr key={mentors._id} className="border">
                    <td className="border px-4 py-2">{mentors.name}</td>
                    <td className="border px-4 py-2">{mentors.email}</td>
                    <td className="border px-4 py-2">{mentors.service.join(", ")}</td>
                    <td className="border px-4 py-2">{mentors.description}</td>
                    <td className="border px-4 py-2">{mentors.mentorshipProvided}</td>
                    <td className="border px-4 py-2">{mentors.rating}</td>
                    <td className="border px-4 py-2">{mentors.available}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => dispatch(updateAvailability({id:mentors._id,currentStatus: mentors.available}))}
                        className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ${mentors.available === "Available"? "bg-green-500 hover:bg-green-600":"bg-red-500 hover:bg-red-600"} `}
                      >
                       {mentors.available === "Available"? "Available":"Not Available"}
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
   )
  )
}

export default AdminMentor