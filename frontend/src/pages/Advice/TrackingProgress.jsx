import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const TrackingProgress = ({ selectedService, onReset }) => {
  const [status, setStatus] = useState("pending");
  const [giveReview, setGiveReview] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [assignedMentor,setAssignedMentor] = useState(null);
  const loggeduser = JSON.parse(localStorage.getItem("user"));
  const user = loggeduser._id;
  console.log("userid",user);
  
  const mentor = useSelector((state) => state.mentors.mentors);

  const getServices = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/advice/allservices");
      const services = res.data.contact;

      const matchedServices = services.filter(
        (s) => s.service.toLowerCase() === selectedService.toLowerCase()
      );

      if (matchedServices.length > 0) {
        const latestService = matchedServices.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];

        const matchedMentor = mentor.find((m) =>
            m.service?.some(
              (serviceName) =>
                serviceName.toLowerCase() === selectedService.toLowerCase()
            )
          );
          setAssignedMentor(matchedMentor);
          
        setStatus(latestService.status);
      } else {
        setStatus("pending");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!comment || rating === 0) {
      toast.warning("Please fill out comment and rating");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/reviews/create", {
        userId:user,
        mentorId: assignedMentor._id,
        rating,
        comment
      });

      toast.success("Review submitted!");
      setGiveReview(true);
      setComment("");
      setRating(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServices();
  }, [selectedService]);

  return (
    <>
      <div className="bg-white p-6 shadow-md rounded-lg mt-4 w-full">
        <h2 className="text-xl font-semibold mb-4 w-full">Your Progress</h2>
        <div className="flex justify-between items-center border p-4 rounded-md w-full">
          <div className="w-1/2">
            <h3 className="font-bold text-lg">{selectedService}</h3>
          </div>
          <div className="w-1/2 flex items-center justify-end">
            <span
              className={`px-4 py-2 rounded ${status === "completed"
                ? "bg-green-500"
                : "bg-yellow-500"
              } text-white`}
            >
              {status}
            </span>
          </div>
        </div>

        {status === "completed" &&
          (giveReview ? (
            <button
              onClick={onReset}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Start New Request
            </button>
          ) : (
            <p className="text-gray-600 mt-4">Please give your review to start a new request.</p>
          ))}
      </div>

      {status === "completed" && !giveReview && (
        <div>
          <h1 className="text-lg font-semibold text-red-600 mb-2">
            You have to give review to the mentor
          </h1>
          <div className="bg-white p-6 shadow-md rounded-lg mt-4 w-full">
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block font-medium mb-1">Comment:</label>
                <textarea
                  name="comment"
                  placeholder="Write about your experience with this mentor"
                  className="w-full border border-gray-300 p-2 rounded"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1">Star Rating:</label>
                <div className="flex">
                  {[...Array(5)].map((_, i) => {
                    const currentRating = i + 1;
                    return (
                      <label key={i}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                          className="hidden"
                        />
                        <FaStar
                          size={30}
                          className="cursor-pointer"
                          color={
                            currentRating <= (hover || rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TrackingProgress;
