import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["Mobile", "Game", "Web", "Software", "Cloud"];

const Development = () => {
  const [selectedCategory, setSelectedCategory] = useState("Web");
  const [categoryData, setCategoryData] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingResources, setLoadingResources] = useState(false);
  const [errorResources, setErrorResources] = useState(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/api/development/${selectedCategory.toLowerCase()}`);
        if (response.data.success) {
          setCategoryData(response.data.data);
        } else {
          setCategoryData(null);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
        setError("Failed to fetch category data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchResources = async () => {
      setLoadingResources(true);
      setErrorResources(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/resources/getresource/${selectedCategory.toLowerCase()}
        `);
        setResources(response.data.resources || []);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setErrorResources("Failed to fetch resources");
      } finally {
        setLoadingResources(false);
      }
    };
    fetchResources();
  }, [selectedCategory]);

  const handleNext = () => {
    if (page < Math.ceil(resources.length / itemsPerPage) - 1) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-1/4 bg-white p-4 shadow-md fixed left-0 h-full">
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              className={`p-2 cursor-pointer hover:bg-blue-500 hover:text-white rounded-md ${
                selectedCategory === category ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setPage(0);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      <main className="ml-[25%] flex-1 p-6 overflow-hidden relative">
        <h2 className="text-2xl font-bold mb-4">{selectedCategory} Development</h2>  
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : categoryData ? (
          <div className="bg-white p-4 shadow rounded-md">
            <h3 className="text-xl font-semibold mb-2">Technologies</h3>
            <ul className="list-disc ml-6">
              {categoryData.languages
                ? Object.entries(categoryData.languages).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}
                    </li>
                  ))
                : <p>No language data available</p>}
            </ul>

            <h3 className="text-xl font-semibold mt-4">Time Required</h3>
            <p>{categoryData.total_time_required || "Not specified"}</p>

            <h3 className="text-xl font-semibold mt-4">Examples</h3>
            <ul className="list-disc ml-6">
              {categoryData.examples?.length > 0
                ? categoryData.examples.map((example, index) => <li key={index}>{example}</li>)
                : <p>No examples available</p>}
            </ul>

            <h3 className="text-xl font-semibold mt-4">Documentation</h3>
            <ul className="list-disc ml-6">
              {categoryData.documentation_links
                ? Object.entries(categoryData.documentation_links).map(([key, link]) => (
                    <li key={key}>
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {key}
                      </a>
                    </li>
                  ))
                : <p>No documentation available</p>}
            </ul>
          </div>
        ) : (
          <p className="text-gray-700">No data available for {selectedCategory} development.</p>
        )}

        <h1 className="text-xl font-bold mt-2 mb-0">Resources:-</h1>
        <div className="mt-6 flex items-center justify-center relative">
          <button
            className="absolute left-[-20px] bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 disabled:opacity-0 z-10000"
            onClick={handlePrev}
            disabled={page === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {loadingResources ? (
            <p className="text-gray-500">Loading resources...</p>
          ) : errorResources ? (
            <p className="text-red-500">{errorResources}</p>
          ) : resources.length > 0 ? (
            <div className="flex gap-4 justify-center px-12 min-h-[320px]">
              {resources.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((resource) => (
                <ResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
          ) : (
            <p className="mt-4">No resources available.</p>
          )}

          <button
            className="absolute right-[-20px] bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 disabled:opacity-0"
            onClick={handleNext}
            disabled={page >= Math.ceil(resources.length / itemsPerPage) - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};

const ResourceCard = ({ resource }) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-72 p-4 flex-shrink-0 transition-transform transform hover:scale-105 min-h-[320px] flex flex-col">
      <img
        src={resource.thumbnail}
        alt={resource.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{resource.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 flex-grow">{resource.description}</p>
      <p className="text-sm text-gray-500 mt-1">⏳ {resource.time_length || "N/A"}</p>
      <p className="text-sm text-gray-500">🗣 {resource.language || "N/A"}</p>
      <a
        href={resource.video_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-2 text-white bg-blue-500 px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition shadow-md"
      >
        Watch Now
      </a>
    </div>
  );
};

export default Development;
