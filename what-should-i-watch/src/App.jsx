import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import FilterContainer from "./components/FilterContainer";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Selection from "./components/Selection";
import Recommendations from "./components/Recommendations";
import Feedback from "./components/Feedback";
import "./App.css";
import MovieCard from "./components/MovieCard";
import movies from "./assets/data/mergedDummyData.json";
import { ClerkProvider } from "@clerk/react-router";

function App() {
  const [movieList, setMovieList] = useState();

  function setMovies() {
    let movieData = movies.map((obj) => {
      return { ...obj };
    });
    setMovieList(movieData);
  }

  // populates movieList upon first load
  useEffect(() => {
    setMovies();
  }, []);
  // Import clerk Publishable Key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  // Throw error if key not imported
  if (!PUBLISHABLE_KEY) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
  }

  return (
    <main>
      <div className="App">
        <BrowserRouter>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <NavBar />
            <Routes>
              <Route index element={<Home />} />
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
            </Routes>
            <Footer />
          </ClerkProvider>
        </BrowserRouter>
      </div>
      <></>
    </main>
  );
}

export default App;
