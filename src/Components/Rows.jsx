import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Rows = ({ title, fetchUrl }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl);
        const sortedData = response.data.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(sortedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl]); // Ensure useEffect runs whenever fetchUrl changes

  if (loading) {
    return <p>Loading podcasts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className='text-white text-xl font-bold md:text-xl p-4'>{title}</h2>
      <div className="relative flex items-center">
        <div id="slider" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {podcasts.map((podcast, id) => (
            <div key={id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
              <img src={podcast.image} alt={podcast.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rows;
