import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

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
  const [displayedResources, setDisplayedResources] = useState([]);

  useEffect(() => {
    const startIndex = page * itemsPerPage;
    setDisplayedResources(resources.slice(startIndex, startIndex + itemsPerPage));
  }, [page, resources]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/development/${selectedCategory.toLowerCase()}`
        );
        setCategoryData(response.data.success ? response.data.data : null);
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
          `http://localhost:3000/api/resources/getresource/${selectedCategory.toLowerCase()}`
        );
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

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 overflow-x-hidden">
      <aside className="w-full md:w-1/4 bg-white p-4 shadow-md relative md:fixed left-0 h-auto md:h-full">
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

      <main className="ml-0 md:ml-[25%] flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">{selectedCategory} Development</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : categoryData ? (
          <div className="bg-white p-4 shadow rounded-md">
            <h3 className="text-xl font-semibold mb-2">Technologies</h3>
            <ul className="list-disc ml-6">
              {categoryData.languages ? (
                Object.entries(categoryData.languages).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}
                  </li>
                ))
              ) : (
                <p>No language data available</p>
              )}
            </ul>

            <h3 className="text-xl font-semibold mt-4">Time Required</h3>
            <p>{categoryData.total_time_required || "Not specified"}</p>

            <h3 className="text-xl font-semibold mt-4">Examples</h3>
            <ul className="list-disc ml-6">
              {categoryData.examples?.length > 0 ? (
                categoryData.examples.map((example, index) => <li key={index}>{example}</li>)
              ) : (
                <p>No examples available</p>
              )}
            </ul>

            <h3 className="text-xl font-semibold mt-4">Documentation</h3>
            <ul className="list-disc ml-6">
              {categoryData.documentation_links ? (
                Object.entries(categoryData.documentation_links).map(([key, link]) => (
                  <li key={key}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      {key}
                    </a>
                  </li>
                ))
              ) : (
                <p>No documentation available</p>
              )}
            </ul>
          </div>
        ) : (
          <p className="text-gray-700">No data available for {selectedCategory} development.</p>
        )}
        <h1 className="text-xl font-bold mt-6">Resources:</h1>
        <div className="mt-6">
  {loadingResources ? (
    <p className="text-gray-500">Loading resources...</p>
  ) : errorResources ? (
    <p className="text-red-500">{errorResources}</p>
  ) : displayedResources.length > 0 ? (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[350px]">
        {displayedResources.map((resource) => (
          <ResourceCard key={resource._id} resource={resource} />
        ))}
      </div>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={Math.ceil(resources.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center mt-6 space-x-2"}
        pageClassName={"hidden"}
        activeClassName={"hidden"}
        previousClassName={"px-4 py-2 border rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300"}
        nextClassName={"px-4 py-2 border rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </>
  ) : (
    <p className="mt-4">No resources available.</p>
  )}
</div>

      </main>
    </div>
  );
};

const ResourceCard = ({ resource }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 flex flex-col h-full">
      <img src={resource.thumbnail} alt={resource.title} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{resource.title}</h3>
      <p className="text-sm text-gray-600 flex-grow">{resource.description}</p>
      <a href={resource.video_url} target="_blank" rel="noopener noreferrer" className="block mt-2 text-white bg-blue-500 px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition shadow-md">
        Watch Now
      </a>
    </div>
  );
};

export default Development;
