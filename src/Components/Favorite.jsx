import React, { useEffect, useState } from "react";

/**
 * Favorite component that allows users to favorite episodes.
 *
 * @param {Object} props - The component props.
 * @param {string} props.episodeId - The ID of the episode.
 * @param {string} props.episodeTitle - The title of the episode.
 * @param {string} props.episodeDescription - The description of the episode.
 * @returns {JSX.Element} - The rendered Favorite component.
 */
const Favorite = ({ episodeId, episodeTitle, episodeDescription }) => {
  // State variables
  const [isFavorite, setIsFavorite] = useState(false); // Whether the episode is favorited
  const [favoriteDate, setFavoriteDate] = useState(null); // The date the episode was favorited

  // Effect hook to check if the episode is already favorited
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Get favorites from local storage
    const favorite = favorites.find(fav => fav.id === episodeId); // Find the favorite episode
    if (favorite) {
      setIsFavorite(true); // Set isFavorite to true
      setFavoriteDate(favorite.date); // Set favoriteDate to the favorite episode's date
    }
  }, [episodeId]);

  /**
   * Toggles the favorite state of the episode.
   * If the episode is already favorited, it removes it from the favorites.
   * Otherwise, it adds the episode to the favorites.
   */
  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Get favorites from local storage
    if (isFavorite) {
      favorites = favorites.filter(fav => fav.id !== episodeId); // Remove the episode from favorites
      setIsFavorite(false); // Set isFavorite to false
      setFavoriteDate(null); // Set favoriteDate to null
    } else {
      const date = new Date().toISOString(); // Get the current date
      favorites.push({ id: episodeId, title: episodeTitle, description: episodeDescription, date }); // Add the episode to favorites
      setIsFavorite(true); // Set isFavorite to true
      setFavoriteDate(date); // Set favoriteDate to the current date
    }
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Update local storage with the new favorites
  };

  return (
    <div>
      <button
        className={`px-4 py-2 rounded-lg transition-colors duration-300 ${isFavorite ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-yellow-400 hover:bg-yellow-500'}`}
        onClick={toggleFavorite}
      >
        {isFavorite ? "Unfavorite" : "Favorite"}
      </button>
      {isFavorite && favoriteDate && (
        <p className="text-sm text-gray-400">Favorited on: {new Date(favoriteDate).toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default Favorite;
