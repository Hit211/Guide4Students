const ResourceCard = ({ resource }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">
        <img 
          src={resource.thumbnail} 
          alt={resource.title} 
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
          <button 
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Watch Now
          </button>
        </div>
      </div>
    );
  };
  
  export default ResourceCard;
  