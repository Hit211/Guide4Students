import { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchNews = async (page = null) => {
    try {
      if (page) setLoadingMore(true);

      const url = `https://newsdata.io/api/1/news?apikey=pub_705077c9b033fce8bb7a0ea31a72d18365dcc&q=IT%20news&language=en&category=education,science,technology${page ? `&page=${page}` : ""}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);

      if (data.status === "error") {
        throw new Error(data?.results?.message || "API error.");
      }

      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("No news articles found.");
      }

      const newArticles = data.results.filter(
        (article, index, self) =>
          index === self.findIndex((a) => a.article_id === article.article_id)
      );

      setNews((prevNews) => [...prevNews, ...newArticles]);
      setNextPage(data.nextPage || data.nextpage || null);
      
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(error.message || "Failed to fetch news.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <p className="text-center text-xl font-semibold mt-10">Loading IT News...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Latest IT News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <div
            key={article.article_id || article.link}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
            onClick={() => window.open(article.link, "_blank")}
          >
            <img
              src={article.image_url || "https://via.placeholder.com/400"}
              alt=""
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {article.description || "No description available."}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">{article.source_name}</span>
                <span className="text-xs text-gray-400">{new Date(article.pubDate).toDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {nextPage && (
        <div className="text-center mt-6">
          <button
            onClick={() => fetchNews(nextPage)}
            disabled={loadingMore}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loadingMore ? "Loading More..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
