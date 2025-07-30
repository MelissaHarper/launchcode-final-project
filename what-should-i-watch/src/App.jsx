import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import FilterContainer from "./components/FilterContainer";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Selection from "./components/Selection";
import Recommendations from "./components/Recommendations";
import Feedback from "./components/Feedback";
import MovieCard from "./components/MovieCard";
import AddToWatchList from "./components/services/AddToWatchList";
import UserDashboard from "./components/gated/UserDashboard";
import { getPopular } from "./components/services/call-functions";
import { options } from "./components/services/call-headers";

import { AppContextProvider } from "./context/AppContext.jsx";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/react-router";
import UserSyncHandler from "./components/services/UserSyncHandler.jsx";
import { useAuth, useUser } from "@clerk/clerk-react";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [toWatch, setToWatch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Callback Function to avoid passing setters */
  const populateMovieList = (input) => {
    setMovieList(input);
  };

  /* populates movieList upon first load */
  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8080/api/movies/ids`
        );
        setMovieList(response.data);
      } catch (err) {
        console.error("Error fetching movie IDs from backend:", err);
        setError("Failed to load movie data from backend.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  // if (isLoading) {
  //   return <div>Loading movie IDs...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  function addMovieToWatch(movie) {
    const newToWatch = [...toWatch, movie];
    setToWatch(newToWatch);
  }

  return (
    <main>
      <div className="App">
        {/* // For future Clerk Authorization */}
        {/* <UserSyncHandler /> */}
        <NavBar />
        <div className="body-content">
          <Routes>
            <Route
              index
              element={
                <Home
                  movieList={movieList}
                  populateMovieList={populateMovieList}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/recommendations"
              element={
                <Recommendations
                  movieList={movieList}
                  populateMovieList={populateMovieList}
                  toWatchComponent={AddToWatchList}
                  handleToWatchClick={addMovieToWatch}
                  toWatch={toWatch}
                  setToWatch={setToWatch}
                />
              }
            />
            <Route
              path="/filterContainer"
              element={
                <FilterContainer
                  movieList={movieList}
                  populateMovieList={populateMovieList}
                />
              }
            />
            <Route
              path="/movieCard"
              element={
                <MovieCard
                  movieList={movieList}
                  populateMovieList={populateMovieList}
                  toWatchComponent={AddToWatchList}
                  handleToWatchClick={addMovieToWatch}
                  toWatch={toWatch}
                  setToWatch={setToWatch}
                />
              }
            />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/selection/:type/detail/:id" element={<Selection />} />
            <Route
              path="/userDashboard"
              element={<UserDashboard toWatchComponent={AddToWatchList} />}
            />
            {/* // For future Clerk Authorization */}
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <UserDashboard />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default App;
