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
import UserSyncHandler from "./components/UserSyncHandler";
import UserDashboard from "./components/UserDashboard";
import { AppContextProvider } from "./context/AppContext.jsx";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/react-router";
// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { getPopular } from "./shared/call-functions.js";
import "./App.css";
import { options } from "./shared/call-headers.js";

function App() {
  const [movieList, setMovieList] = useState(getPopular("movie", options));
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const API_BASE_URL = "http://localhost:8080/api";

  // // populates movieList upon first load
  // useEffect(() => {
  //   const fetchMovieData = async () => {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/movies/ids`);
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

  // Import clerk Publishable Key
  const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  // Throw error if key not imported
  if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
  }

  return (
    <main>
      <div className="App">
        <AppContextProvider>
          <BrowserRouter>
            <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
              <UserSyncHandler />
              <NavBar />
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
                  <Route
                    path="/selection/:type/detail/:id"
                    element={<Selection />}
                  />
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
            </ClerkProvider>
          </BrowserRouter>
        </AppContextProvider>
      </div>
      <></>
    </main>
  );
}

export default App;
