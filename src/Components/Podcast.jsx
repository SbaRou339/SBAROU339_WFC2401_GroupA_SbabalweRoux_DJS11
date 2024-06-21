import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Podcast = () => {
  const podcastId = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [playingEpisode, setPlayingEpisode] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
     
      fetch(`https://podcast-api.netlify.app/id/${podcastId.id}`).then(
        (response) => {return response.json()}
      ).then((data) => {
        setPodcast(data);
        setLoading(false);
      })
       .catch ((error) =>{
        console.error(`Error fetching show with ID ${podcastId}:`, error);
        setError(`Error fetching show with ID ${podcastId}`);
        setLoading(false);
       });
  }, []);

  const handleSeasonSelect = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
    setOpenDropdown(openDropdown === seasonNumber ? null : seasonNumber);
    setPlayingEpisode(null); // Reset playing episode when selecting a new season
  };

  const playEpisode = (episodeId) => {
    setPlayingEpisode(episodeId);
  };

  const pauseEpisode = () => {
    setPlayingEpisode(null);
  };

  const toggleFavorite = (episodeId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [episodeId]: !prevFavorites[episodeId],
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!podcast) {
    return <p>Podcast not found</p>;
  }

  return (
    <div className="text-white">
      <h1>{podcast.title}</h1>
      <p>{podcast.description}</p>
      {podcast.seasons.map((season) => (
        <div key={season.id}>
          <h2 onClick={() => handleSeasonSelect(season.number)}>
            Season {season.number}
          </h2>
          {openDropdown === season.number && (
            <ul>
              {season.episodes.map((episode) => (
                <li key={episode.id}>
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                  <button onClick={() => playEpisode(episode.id)}>
                    {playingEpisode === episode.id ? "Pause" : "Play"}
                  </button>
                  <button onClick={() => toggleFavorite(episode.id)}>
                    {favorites[episode.id] ? "Unfavorite" : "Favorite"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Podcast;
