import axios from "axios";
import { MoreVertical, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileCard = ({ mentor, onclose }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  console.log("user",user);
  
  const getDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/${mentor._id}`);
      if (response.data.status) {
        setData(response.data.data); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [mentor._id]);

  const handleClick = () => {
    onclose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={handleClick}
          className="absolute top-3 right-4 text-gray-600 hover:text-red-600 text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-4">
          <h2 className="text-2xl font-bold">{mentor?.name}</h2>
          <p className="text-gray-600">{mentor?.description}</p>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Email:</strong> {mentor?.email}
          </p>
          <p>
            <strong>Company:</strong> {mentor?.company || "N/A"}
          </p>
          <p>
            <strong>Service:</strong> {mentor?.service?.join(", ")}
          </p>
          <p>
            <strong>Mentorship Provided:</strong> {mentor?.mentorshipProvided}
          </p>
        </div>

        <div className="mt-5">
          <h3 className="text-lg font-semibold mb-2">Reviews</h3>
          {data.length > 0 ? (
            data.map((review, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-2 rounded mb-2 bg-gray-50"
              >
                <div>
                  <p className="font-medium">
                    {review.userId?.name}
                    <span className="text-sm text-gray-500 ml-1">
                      ({review.userId?.email})
                    </span>
                  </p>
                  <p className="text-sm">{review.comment}</p>
                </div>
                
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-semibold">{review.rating}</span>
                  {
                    user?._id === review.userId?._id && (
                      <MoreVertical
                      className="h-5 w-5 text-gray-600 cursor-pointer"
                      />
                    )
                  }
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
