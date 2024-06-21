import React from 'react' 
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../src/Components/Navbar";
import HomeButtons from "./Components/Buttons";
import GenrePage from "./Pages/GenrePage";
import Home from "./Pages/HomePage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Podcast from "./Components/Podcast";

const Layout = ({ children, selectedPodcast, setSelectedPodcast }) => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar path="/"/>}
      {React.cloneElement(children, { selectedPodcast, setSelectedPodcast })}
    </>
  );
};

const App = () => {
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout selectedPodcast={selectedPodcast} setSelectedPodcast={setSelectedPodcast}>
              <Home />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home-buttons"
          element={
            <Layout selectedPodcast={selectedPodcast} setSelectedPodcast={setSelectedPodcast}>
              <HomeButtons />
            </Layout>
          }
        />
        <Route
          path="/genre"
          element={
            <Layout selectedPodcast={selectedPodcast} setSelectedPodcast={setSelectedPodcast}>
              <GenrePage />
            </Layout>
          }
        />
        <Route
          path=":id"
          element={
            <Layout selectedPodcast={selectedPodcast} setSelectedPodcast={setSelectedPodcast}>
              <Podcast />
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
