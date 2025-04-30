import { FaLinkedin } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

const MentorCard = ({ mentor, setViewMore }) => {
  const navigate = useNavigate();
  const { service } = useParams();

  const handleViewMore = (e) => {
    e.stopPropagation(); 
    setViewMore(mentor); 
    if (service) {
      navigate(`/dashboard/advice/${service}/mentor/${mentor._id}`);
    } else {
      setViewMore(mentor); 
    }
  };

  return (
    <div className="border border-gray-200 w-[186px] rounded-lg shadow-lg p-4 bg-white">
      <div className="flex justify-between mb-3">
        <a
          href={mentor.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 block w-fit text-2xl cursor-pointer transition-transform hover:scale-125 duration-300 ease-in-out"
        >
          <FaLinkedin />
        </a>
        <span
          className={`${
            mentor.available === "Available"
              ? "text-green-500 hover:text-green-600"
              : "text-red-500"
          } font-bold`}
        >
          {mentor.available}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={mentor.profilePic}
          alt={mentor.name}
          className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
        />
        <h1 className="text-lg font-semibold mt-2">{mentor.name}</h1>
        <p className="text-gray-600 text-sm text-center px-2">{mentor.description}</p>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <p>
          <span className="font-medium">Services Provided:</span>{" "}
          {mentor.mentorshipProvided}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-yellow-500 font-semibold text-sm">
          ⭐ {Math.ceil(mentor.totalrating)}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm"
          onClick={handleViewMore}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default MentorCard;