import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../src/Components/Navbar";
import HomeButtons from "./Components/Buttons";
import GenrePage from "./Pages/GenrePage";
import Home from "./Pages/HomePage";
import Login from "./Pages/Login";
import PodcastPage from "./Pages/PodcastPage";
import SignUp from "./Pages/SignUp";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home-buttons"
          element={
            <Layout>
              <HomeButtons />
            </Layout>
          }
        />
        <Route
          path="/genre"
          element={
            <Layout>
              <GenrePage />
            </Layout>
          }
        />
        <Route
          path="/podcast"
          element={
            <Layout>
              <PodcastPage />
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
