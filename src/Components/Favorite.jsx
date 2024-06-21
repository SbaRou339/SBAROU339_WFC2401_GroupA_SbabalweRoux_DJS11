import React, { useEffect, useState } from "react";

const Favorite = ({ episodeId, episodeTitle, episodeDescription }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteDate, setFavoriteDate] = useState(null);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favorite = favorites.find(fav => fav.id === episodeId);
    if (favorite) {
      setIsFavorite(true);
      setFavoriteDate(favorite.date);
    }
  }, [episodeId]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter(fav => fav.id !== episodeId);
      setIsFavorite(false);
      setFavoriteDate(null);
    } else {
      const date = new Date().toISOString();
      favorites.push({ id: episodeId, title: episodeTitle, description: episodeDescription, date });
      setIsFavorite(true);
      setFavoriteDate(date);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
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
