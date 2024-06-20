import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButtons from "./Buttons"; // Import HomeButtons

const Main = () => {
  const navigate = useNavigate();
  const [podcasts, setPodcasts] = useState([]);
  const [genre, setGenre] = useState([]);
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

  const sortPodcasts = (criteria) => {
    let sortedData;
    switch (criteria) {
      case "A-Z":
        sortedData = [...podcasts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "Z-A":
        sortedData = [...podcasts].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      case "Date (New-Old)":
        sortedData = [...podcasts].sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
        break;
      case "Date (Old-New)":
        sortedData = [...podcasts].sort(
          (a, b) => new Date(a.updated) - new Date(b.updated)
        );
        break;
      default:
        sortedData = podcasts;
    }
    setFilteredPodcasts(sortedData);
  };

  const genres = {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  const sortGenres = (genreId) => {
    useEffect(() => {
      const fetchGenres = async () => {
        try {
          const response = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setGenre(data);
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchGenres();
    }, []);

    let sortedGenre;
    switch (genres) {
      case "Personal Growth":
        sortedGenre = [...genres].sort((genres[1], genreId) =>
          genres[1].localeCompare(genreId)
        );
        break;
      case "Investigative Journalism":
        sortedGenre = [...genres].sort((genres[2], genreId) =>
          genres[2].localeCompare(genreId)
        );
        break;
      default:
        sortedGenre = genre;
    }

  };

  const filterResults = (query) => {
    const filtered = podcasts.filter((podcast) =>
      podcast.title.toLowerCase().includes(query.toLowerCase())
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
      <HomeButtons onSort={sortPodcasts} onGenre={sortGenres} />{" "}
      {/* Pass the sort function as a prop */}
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
                  onClick={() => {
                    navigate("/podcast");
                    onShowClick(podcast.id);
                  }}
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
