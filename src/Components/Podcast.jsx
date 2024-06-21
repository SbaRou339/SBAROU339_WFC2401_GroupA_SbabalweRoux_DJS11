import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css"; // Ensure Tailwind is imported
import Favorite from "./Favorite"; // Import Favorite component

const Podcast = ({ selectedPodcast, setSelectedPodcast }) => {
  const podcastId = useParams();
  const [podcast, setPodcast] = useState(selectedPodcast || null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [playingEpisode, setPlayingEpisode] = useState(null);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState({});

  useEffect(() => {
    if (!selectedPodcast || selectedPodcast.id !== podcastId.id) {
      fetch(`https://podcast-api.netlify.app/id/${podcastId.id}`)
        .then((response) => response.json())
        .then((data) => {
          setPodcast(data);
          setSelectedPodcast(data); // Update the selected podcast in the parent component
          setLoading(false);
        })
        .catch((error) => {
          console.error(`Error fetching show with ID ${podcastId.id}:`, error);
          setError(`Error fetching show with ID ${podcastId.id}`);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [podcastId, selectedPodcast, setSelectedPodcast]);

  const handleSeasonSelect = (seasonNumber) => {
    setSelectedSeason(selectedSeason === seasonNumber ? null : seasonNumber);
    setPlayingEpisode(null); // Reset playing episode when selecting a new season
  };

  const audioRef = React.createRef();
  const playEpisode = (episodeId) => {
    setPlayingEpisode(episodeId);
    audioRef.current.src = episodes.find(
      (episode) => episode.id === episodeId
    ).audioSrc;
    audioRef.current.play(); // Start playing the audio
  };

  const pauseEpisode = () => {
    setPlayingEpisode(null);
    audioRef.current.pause(); // Pause the audio
  };

  const toggleDescription = (episodeId) => {
    setShowFullDescription((prevShowFullDescription) => ({
      ...prevShowFullDescription,
      [episodeId]: !prevShowFullDescription[episodeId],
    }));
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

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!podcast) {
    return <p className="text-white">Podcast not found</p>;
  }

  return (
    <div className="flex flex-col text-white bg-black p-6 rounded-lg max-w-4xl mx-auto shadow-lg gap-6">
      <div className="flex flex-col mt-20 items-center">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-48 h-48 rounded-full mb-6"
        />
        <h1 className="text-3xl mt-4 font-bold mb-4">{podcast.title}</h1>
      </div>
      <p className="text-lg mb-6">{podcast.description}</p>
      {podcast.seasons.map((season) => (
        <div key={season.id} className="mb-6">
          <h2
            className="text-2xl font-semibold cursor-pointer mb-2 border-b-2 border-gray-700 pb-1 transition-colors duration-300 hover:text-blue-400"
            onClick={() => handleSeasonSelect(season.number)}
          >
            Season {season.number}
          </h2>
          {selectedSeason === season.number && (
            <div className="flex flex-col gap-4">
              {season.image && (
                <img
                  src={season.image}
                  alt={`Season ${season.number}`}
                  className="w-32 h-32 rounded mb-4"
                />
              )}
              <ul className="list-none pl-0">
                {season.episodes.map((episode) => (
                  <li
                    className="mb-4 p-4 border border-gray-700 rounded-lg transition-colors duration-300 hover:bg-gray-800"
                    key={episode.id}
                  >
                    <h3 className="text-xl font-medium mb-2">
                      {episode.title}
                    </h3>
                    <p className="text-base mb-4">
                      {showFullDescription[episode.id]
                        ? episode.description
                        : `${episode.description.slice(0, 100)}...`}
                      <button
                        className="ml-2 text-blue-500 hover:underline"
                        onClick={() => toggleDescription(episode.id)}
                      >
                        {showFullDescription[episode.id]
                          ? "Show less"
                          : "Show more"}
                      </button>
                    </p>
                    <button
                      className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-600"
                      onClick={() => playEpisode(episode.id)}
                    >
                      {playingEpisode === episode.id ? "Pause" : "Play"}
                    </button>
                    <Favorite
                      episodeId={episode.id}
                      episodeTitle={episode.title}
                      episodeDescription={episode.description}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Podcast;
