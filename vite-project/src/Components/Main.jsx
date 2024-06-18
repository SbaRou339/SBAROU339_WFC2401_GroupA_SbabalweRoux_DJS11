import React, { useEffect, useState } from "react";
import PodcastCarousel from '/src/Components/PodcastCarousel';

// const truncateDescription = (description, wordLimit) => {
//   const words = description.split(" ");
//   if (words.length > wordLimit) {
//     return words.slice(0, wordLimit).join(" ") + "...";
//   }
//   return description;
// };

const Main = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(sortedData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPodcasts();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
    <PodcastCarousel />
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {podcasts.length === 0 ? (
          <p>Loading...</p>
        ) : (
          podcasts.map((podcast) => (
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
                  className="text-gray-300 mb-2"
                  onClick={() => onShowClick(podcast.id)}
                >
                  <strong>Seasons:</strong> {podcast.seasons}
                </button>
                <p className="text-gray-300">
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
