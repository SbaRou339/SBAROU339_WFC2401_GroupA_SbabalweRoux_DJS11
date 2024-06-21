import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeButtons from "./Buttons"; // Import HomeButtons

const Main = () => {
  const navigate = useNavigate();
  const [podcasts, setPodcasts] = useState([]);
  const [genre, setGenre] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [filteredGenre, setFilteredGenre] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


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
        setLoading(false);
      } catch (error) {
        setError(error.message);
        
      }
    };

    fetchPodcasts();
  }, []);

  useEffect(() => {
    const fetchPodcastGenre = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/shows/${genre}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setGenre(sortedData)
        setFilteredPodcasts(sortedData);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPodcastGenre();
  },[]);

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

  const sortGenres = (criteria) => {
    let sortedData;
    switch (criteria) {
      case "Personal Growth":
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Personal Growth")
        );
        break;
      case "Investigative Journalism":
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Investigative Journalism")
        );
        break;
      case "History":
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("History")
        );
        break;
      case "Comedy":
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Comedy")
        );
        break;
      case "Entertainment":
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Entertainment")
        );
        break;
      case "Business":
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Business")
        );
        break;
      case "Fiction":
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Fiction")
        );
        break;
      case "News":
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("News")
        );
        break;
        case "Kids and family":
          sortedData = [...podcasts].filter((podcast) =>
            podcast.genres.includes("Kids and Family")
          );
          break;
      default:
        sortedData = podcasts;
    }
    setFilteredGenre(sortedData);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-blue-500 p-4 bg-blue-500 rounded-full animate-spin transition-transform duration-700 ease-in-out">
          Loading....
        </p>
      </div>
    );
  }

  // const filterResults = (query) => {
  //   const filtered = podcasts.filter((podcast) =>
  //     podcast.title.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredPodcasts(filtered);
  // };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const onShowClick = (id) => {
    // Function to handle "Listen Now" button click
    console.log(`Podcast ID: ${id}`);
  };

  return (
    <>
      <HomeButtons onSort={sortPodcasts} onGenre={sortGenres}/>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPodcasts && (
          filteredPodcasts.map((podcast) => {return (<Link
            key={podcast.id}
            to={`${podcast.id}`}
          >
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
                    navigate(":id");
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
            </Link>
            )})
        )}
      </div>
    </>
  );
};

export default Main;
