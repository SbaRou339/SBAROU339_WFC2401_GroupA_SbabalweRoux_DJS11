import React, { useState } from 'react';

/**
 * SearchBar component renders an input field for searching podcasts.
 * It fetches the podcast data from the API and updates the state variables.
 * It also handles loading and error states.
 *
 * @param {function} setResults - function to set the search results
 * @returns {JSX.Element} - a div containing the input field and loading/error messages
 */
const SearchBar = ({ setResults }) => {
  // State variables
  const [query, setQuery] = useState(''); // stores the search query
  const [loading, setLoading] = useState(false); // indicates if data is being loaded
  const [error, setError] = useState(null); // stores any error that occurs during data fetching

  /**
   * Fetches the podcast data from the API and updates the state variables.
   *
   * @param {string} value - the search query
   */
  const fetchData = (value) => {
    setLoading(true);
    setError(null);

    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        // Filter the podcasts that match the search query
        const results = json.filter((podcast) => {
          return value && podcast && podcast.title && podcast.title.toLowerCase().includes(value.toLowerCase());
        });
        setResults(results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  /**
   * Handles the input change event and updates the search query.
   * Also calls the fetchData function to fetch the podcast data.
   *
   * @param {Event} event - the input change event
   */
  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);
    fetchData(value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for podcasts..."
        className="w-full p-1 rounded-lg border border-gray-300"
      />
      {loading && <p className="text-gray-500 bg-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default SearchBar;
