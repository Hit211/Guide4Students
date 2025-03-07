import  { useEffect, useState } from "react";
import axios from "axios";

const Community = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/community/all");
        if (response.data.success) {
          setCommunities(response.data.communities);
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Communities</h2>
      <div className="w-full overflow-x-auto">
        <div className="min-w-full bg-white shadow-md rounded-lg p-4">
          {communities.map((community) => (
            <div key={community._id} className="flex items-center justify-between border-b py-4">
              <div className="w-1/3">
                <h3 className="text-lg font-semibold">{community.name}</h3>
                <p className="text-gray-600 text-sm">{community.description}</p>
              </div>
              <span className="text-gray-500 w-1/6 text-center">{community.platform}</span>
              <a
                href={community.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-1/6 text-center"
              >
                Join Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
