import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * PodcastCarousel component displays a carousel of podcasts.
 * It fetches the podcast data from the API and displays them in a carousel.
 * It also handles loading and error states.
 */
const PodcastCarousel = () => {
  // State variables
  const [podcasts, setPodcasts] = useState([]); // Stores the podcast data
  const [loading, setLoading] = useState(true); // Indicates if data is being loaded
  const [error, setError] = useState(null); // Stores any error that occurs during data fetching

  /**
   * Fetches the podcast data from the API and updates the state variables.
   */
  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPodcasts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  /**
   * Renders the loading or error message if needed.
   */
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10">Error: {error.message}</div>;

  /**
   * Sets the settings for the carousel.
   */
  const settings = {
    dots: false, // Remove the dotted navigation bar
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Show multiple podcasts at a time
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  /**
   * Renders the carousel of podcasts.
   */
  return (
    <div className="w-full h-[550px] text-white bg-black py-20">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {/* Map over the podcasts array and render a carousel item for each podcast */}
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="p-2">
              <div className="transform hover:scale-105 transition-transform duration-300 bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={podcast.image}
                    alt={podcast?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white">{podcast.title}</h2>
                  <p className="text-gray-400">{podcast.genre}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PodcastCarousel;
