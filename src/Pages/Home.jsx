import React from 'react'
import Main from '../Components/Main'
import PodcastCarousel from "/src/Components/PodcastCarousel";
import HomeButtons from '../Components/Buttons';

const Home = () => {
  return (
    <>
        <PodcastCarousel />
        <HomeButtons />
        <Main />
    </>
  )
}

export default Home