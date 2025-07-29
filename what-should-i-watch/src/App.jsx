import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
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
import UserSyncHandler from "./components/services/UserSyncHandler.jsx";
import UserDashboard from "./components/UserDashboard";
import { AppContextProvider } from "./context/AppContext.jsx";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/react-router";
// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
// import { getPopular } from "./components/services/call-functions.js";
// import "./App.css";
// import { options } from "./components/services/call-headers.js";

function App() {
  const [movieList, setMovieList] = useState();
  const [signedIn, setSignedIn] = useState(false);

  function authorizeClick(e) {
    e.preventDefault();
    {
      signedIn ? setSignedIn(false) : setSignedIn(true);
    }
  }
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const { getToken } = useAuth();

  // const API_BASE_URL = "http://localhost:8080/api";

  // // populates movieList upon first load
  // useEffect(() => {
  //   const fetchMovieData = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     const token = await getToken();

  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/movies/ids`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setMovieList(response.data);
  //     } catch (err) {
  //       console.error("Error fetching movie IDs from backend:", err);
  //       setError("Failed to load movie data from backend.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchMovieData();
  // }, []);

  // if (isLoading) {
  //   return <div>Loading movie IDs...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

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
