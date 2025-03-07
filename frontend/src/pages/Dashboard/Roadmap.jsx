import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Roadmap = () => {
  const [roadmapItems, setRoadmapItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();  
  const navigate = useNavigate();

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

  const filteredItems = id
    ? roadmapItems.filter((item) => item._id === id)
    : roadmapItems;

   console.log("id:", id);
   console.log("filteredItems:",filteredItems);
   
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-10">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Explore Roadmaps & Resources
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="relative bg-blue-600 text-white p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-95 hover:shadow-2xl"
                onClick={() => navigate(`/dashboard/roadmap/${item._id}`)}
              >
                <h2 className="text-lg font-semibold text-center">{item.name}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
