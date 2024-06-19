import React, { useState } from 'react';

const SearchBar = ({ setResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        className="w-full p-2 rounded-lg border border-gray-300"
      />
      {loading && <p className="text-gray-500 bg-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default SearchBar;
