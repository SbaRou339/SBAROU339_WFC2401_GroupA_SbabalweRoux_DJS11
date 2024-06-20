import React, { useState, useEffect } from 'react';

const Podcast = ({ podcastId }) => {
    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPodcast(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching podcast data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [podcastId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!podcast) {
        return <p>Podcast not found</p>;
    }

    return (
        <div>
            <h2>{podcast.title}</h2>
            <p>{podcast.description}</p>
            <p>Author: {podcast.author}</p>
            <p>Published Date: {podcast.published_date}</p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default Podcast;
