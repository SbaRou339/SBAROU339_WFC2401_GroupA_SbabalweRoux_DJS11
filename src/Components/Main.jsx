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
    /**
     * Fetches podcast data from the API and updates the component state.
     * Sorts the data by title before updating the state.
     * Sets the error state if the network response is not ok.
     */
    const fetchPodcasts = async () => {
      try {
        // Fetch podcast data from the API
        const response = await fetch("https://podcast-api.netlify.app/shows");
        
        // Check if the network response is ok
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        // Parse the response data as JSON
        const data = await response.json();
        
        // Sort the data by title before updating the state
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        
        // Update the component state with the sorted data
        setPodcasts(sortedData);
        setFilteredPodcasts(sortedData); // Initialize filteredPodcasts with sortedData
        
        // Set the loading state to false
        setLoading(false);
      } catch (error) {
        // Set the error state if an error occurs during data fetching
        setError(error.message);
      }
    };

    fetchPodcasts();
  }, []);

  useEffect(() => {
    /**
     * Fetches the podcast data for a specific genre from the API
     * and updates the component state.
     * Sorts the data by title before updating the state.
     * Sets the error state if the network response is not ok.
     */
    const fetchPodcastGenre = async () => {
      try {
        // Fetch the podcast data for the selected genre from the API
        const response = await fetch(
          `https://podcast-api.netlify.app/shows/${genre}`
        );
        
        // Check if the network response is ok
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        // Parse the response data as JSON
        const data = await response.json();
        
        // Sort the data by title before updating the state
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        
        // Update the component state with the sorted data
        setGenre(sortedData);
        setFilteredPodcasts(sortedData);
      } catch (error) {
        // Set the error state if an error occurs during data fetching
        setError(error.message);
      }
    };

    fetchPodcastGenre();
  }, []);

  /**
   * Sorts the podcasts based on the specified criteria.
   *
   * @param {string} criteria - The criteria to sort the podcasts by.
   *                           Possible values: "A-Z", "Z-A", "Date (New-Old)", "Date (Old-New)".
   */
  const sortPodcasts = (criteria) => {
    let sortedData;

    switch (criteria) {
      case "A-Z":
        // Sort the podcasts in alphabetical order (A-Z)
        sortedData = [...podcasts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "Z-A":
        // Sort the podcasts in reverse alphabetical order (Z-A)
        sortedData = [...podcasts].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      case "Date (New-Old)":
        // Sort the podcasts by their date in descending order (New-Old)
        sortedData = [...podcasts].sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
        break;
      case "Date (Old-New)":
        // Sort the podcasts by their date in ascending order (Old-New)
        sortedData = [...podcasts].sort(
          (a, b) => new Date(a.updated) - new Date(b.updated)
        );
        break;
      default:
        // If the criteria is not recognized, do not sort the podcasts
        sortedData = podcasts;
    }

    // Update the state with the sorted podcasts
    setFilteredPodcasts(sortedData);
  };

  /**
   * Sorts the podcasts based on the selected genre.
   * @param {string} criteria - The genre to sort the podcasts by.
   *                           Possible values: "Personal Growth", "Investigative Journalism",
   *                                            "History", "Comedy", "Entertainment", "Business",
   *                                            "Fiction", "News", "Kids and Family".
   */
  const sortGenres = (criteria) => {
    // Sort the podcasts based on the selected genre
    let sortedData;
    switch (criteria) {
      case "Personal Growth":
        // Filter the podcasts that have the "Personal Growth" genre
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Personal Growth")
        );
        break;
      case "Investigative Journalism":
        // Filter the podcasts that have the "Investigative Journalism" genre
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Investigative Journalism")
        );
        break;
      case "History":
        // Filter the podcasts that have the "History" genre
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("History")
        );
        break;
      case "Comedy":
        // Filter the podcasts that have the "Comedy" genre
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Comedy")
        );
        break;
      case "Entertainment":
        // Filter the podcasts that have the "Entertainment" genre
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Entertainment")
        );
        break;
      case "Business":
        // Filter the podcasts that have the "Business" genre
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Business")
        );
        break;
      case "Fiction":
        // Filter the podcasts that have the "Fiction" genre
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Fiction")
        );
        break;
      case "News":
        // Filter the podcasts that have the "News" genre
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("News")
        );
        break;
      case "Kids and family":
        // Filter the podcasts that have the "Kids and Family" genre
        sortedData = [...podcasts].filter((podcast) =>
          podcast.genres.includes("Kids and Family")
        );
        break;
      default:
        // If the genre is not recognized, do not sort the podcasts
        sortedData = podcasts;
    }

    // Update the state with the sorted podcasts
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
      <H
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
            );
          })}
      </div>
    </>
  );
};

export default Main;
