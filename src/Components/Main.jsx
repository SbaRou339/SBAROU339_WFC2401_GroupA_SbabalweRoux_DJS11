import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app/shows");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(sortedData);
        setFilteredPodcasts(sortedData); // Initialize filteredPodcasts with sortedData
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPodcasts();
  }, []);

  const filterResults = (query) => {
    const filtered = podcasts.filter((podcast) =>
      podcast.title.toLowerCase().includes(query)
    );
    setFilteredPodcasts(filtered);
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const onShowClick = (id) => {
    // Function to handle "Listen Now" button click
    console.log(`Podcast ID: ${id}`);
  };

  return (
    <>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPodcasts.length === 0 ? (
          <p>Loading...</p>
        ) : (
          filteredPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="relative bg-cover bg-center rounded-lg shadow-md h-96"
              style={{ backgroundImage: `url(${podcast.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              <div className="relative z-10 p-4 flex flex-col justify-end h-full">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {podcast.title}
                </h2>
                <button
                  className="text-gray-300 mb-2 py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
                  onClick={() => {navigate('/podcast'), onShowClick(podcast.id)}}
                >
                  <strong>Listen Now</strong>
                </button>
                <p className="text-gray-300 w-full bg-blue-700 p-2 rounded-lg">
                  <strong>Last Updated:</strong>{" "}
                  {new Date(podcast.updated).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Main;
