import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [podcasts, setPodcasts] = useState([]);
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
          return podcast.title.toLowerCase().includes(value.toLowerCase());
        });
        setPodcasts(results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    fetchData(value);
  };

  return (
    <div className="my-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for podcasts..."
        className="w-full p-2 rounded-lg border border-gray-300"
      />
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <ul className="mt-4 space-y-2">
        {podcasts.map((podcast) => (
          <li key={podcast.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{podcast.title}</h3>
            <p className="text-gray-600">{podcast.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
