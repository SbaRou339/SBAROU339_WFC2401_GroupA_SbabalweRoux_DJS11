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
import Favorite from './Components/Favorite';

/**
 * Layout component that wraps the child components and adds a navbar
 * @param {Object} props - The props object
 * @param {React.ReactNode} props.children - The child components to be wrapped
 * @param {Object|null} props.selectedPodcast - The selected podcast object or null
 * @param {Function} props.setSelectedPodcast - The function to set the selected podcast
 * @returns {JSX.Element} - The layout component
 */
const Layout = ({ children, selectedPodcast, setSelectedPodcast }) => {
  // Get the current location pathname
  const location = useLocation();
  // Check if the current pathname is '/login' or '/signup', and if so, hide the navbar
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  // Render the navbar if it is not hidden, and clone the child components with the selected podcast and setSelectedPodcast props
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
        <Route path="/favorites" element={<Favorite/>} />
      </Routes>
    </>
  );
};

export default App;
