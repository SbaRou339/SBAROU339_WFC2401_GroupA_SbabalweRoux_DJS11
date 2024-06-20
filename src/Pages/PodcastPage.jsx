import React from "react";
import Episodes from "../Components/Episodes";
import Podcast from "../Components/Podcast";

const PodcastPage = () => {
  return (
    <>
      <h1 className="text-blue-500 text-3xl py-[100px] px-[15px]">
        Podcast Page
      </h1>
      <Podcast />
      <Episodes />
    </>
  );
};

export default PodcastPage;
