import React from 'react';
import Rows from './Rows';

const PodcastGenres = () => {
  return (
    <>
      <Rows title="Personal Growth" fetchUrl={`https://podcast-api.netlify.app/genre/1`} />
      <Rows title="Investigative Journalism" fetchUrl={`https://podcast-api.netlify.app/genre/2`} />
      <Rows title="History" fetchUrl={`https://podcast-api.netlify.app/genre/3`} />
      <Rows title="Comedy" fetchUrl={`https://podcast-api.netlify.app/genre/4`} />
      <Rows title="Entertainment" fetchUrl={`https://podcast-api.netlify.app/genre/5`} />
      <Rows title="Business" fetchUrl={`https://podcast-api.netlify.app/genre/6`} />
      <Rows title="Fiction" fetchUrl={`https://podcast-api.netlify.app/genre/7`} />
      <Rows title="News" fetchUrl={`https://podcast-api.netlify.app/genre/8`} />
      <Rows title="Kids and Family" fetchUrl={`https://podcast-api.netlify.app/genre/9`} />
    </>
  );
};

export default PodcastGenres;
