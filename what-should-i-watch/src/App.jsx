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
import UserDashboard from "./components/UserDashboard";
// For future Clerk Authorization
// import { AppContextProvider } from "./context/AppContext.jsx";
// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/react-router";
// import UserSyncHandler from "./components/services/UserSyncHandler.jsx";
// import { useAuth, useUser } from "@clerk/clerk-react";

function App() {
  const [movieList, setMovieList] = useState();
  const [signedIn, setSignedIn] = useState(false);
  const [toWatch, setToWatch] = useState([]);

  function authorizeClick(e) {
    e.preventDefault();
    {
      signedIn ? setSignedIn(false) : setSignedIn(true);
    }
  }

  function addMovieToWatch(movie) {
    const newToWatch = [...toWatch, movie];
    setToWatch(newToWatch);
  }

  return (
    <main>
      <div className="App">
        {/* // For future Clerk Authorization */}
        {/* <UserSyncHandler /> */}
        <NavBar signedIn={signedIn} authorizeClick={authorizeClick} />
        <div className="body-content">
          <Routes>
            <Route
              index
              element={
                <Home movieList={movieList} setMovieList={setMovieList} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/recommendations"
              element={
                <Recommendations
                  movieList={movieList}
                  setMovieList={setMovieList}
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
                  setMovieList={setMovieList}
                />
              }
            />
            <Route path="/movieCard" element={<MovieCard />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/selection/:type/detail/:id" element={<Selection />} />
            <Route
              path="/userDashboard"
              element={<UserDashboard toWatchComponent={AddToWatchList} />}
            />
            {/* // For future Clerk Authorization */}
            {/* <Route
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
            /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default App;
