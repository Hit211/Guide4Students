import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";

const Roadmap = () => {
  const [roadmapItems, setRoadmapItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();  
  const navigate = useNavigate();
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/roadmaps/getmaps");
        if (response.data.success) {
          setRoadmapItems(response.data.roadmap);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Axios Fetch Error:", error);
        setError("Failed to fetch roadmap items.");
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, []);

  useEffect(() => {
    const validRefs = itemRefs.current.filter(Boolean);
    if (validRefs.length) {
      if (containerRef.current) containerRef.current.style.overflowX = "hidden";
      if (containerRef.current) containerRef.current.style.overflowY = "hidden";
      gsap.fromTo(
        validRefs,
        {
          opacity: 0,
          y: 50,
          x: (i) => (i % 2 === 0 ? -100 : 100), 
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          stagger: 0.3, 
          duration: 2,
          ease: "power2.out",
        }
      );
    }
  }, [roadmapItems]);

  const filteredItems = id
    ? roadmapItems.filter((item) => item._id === id)
    : roadmapItems;

  return (
    <div 
    ref={containerRef}
    className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
          Explore Roadmaps & Resources
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="flex flex-col gap-10">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`relative p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  index % 2 === 0
                    ? "ml-0 mr-auto bg-gradient-to-r from-blue-500 to-indigo-600"
                    : "ml-auto mr-0 mt-[-30px] bg-gradient-to-r from-purple-500 to-pink-600"
                } w-[80%] text-white`}
                onClick={() => navigate(`/dashboard/roadmap/${item._id}`)}
              >
                <h2 className="text-xl font-semibold text-center">{item.name}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
