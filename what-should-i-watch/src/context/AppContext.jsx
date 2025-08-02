import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const baseUrl = "http://localhost:8080/api";
  // const baseUrl = "widely-endless-basilisk.ngrok-free.app/api";

  // Set State and persist in localStorage
  const [movieList, setMovieList] = useState(() => {
    const saved = localStorage.getItem("movieList");
    return saved ? JSON.parse(saved) : [];
  });

  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem("recommendations");
    return saved ? JSON.parse(saved) : [];
  });

  const [toWatchList, setToWatchList] = useState(() => {
    const saved = localStorage.getItem("toWatchList");
    return saved ? JSON.parse(saved) : [];
  });

  // Set lists
  const populateMovieList = (list) => {
    setMovieList(list);
    localStorage.setItem("movieList", JSON.stringify(list));
  };

  const populateRecommendations = (list) => {
    setRecommendations(list);
    localStorage.setItem("recommendations", JSON.stringify(list));
  };

  const addMovieToWatchList = (movie) => {
    const newToWatchList = [...toWatchList, movie];
    setToWatchList(newToWatchList);
  };

  const removeMovieFromWatchList = (movie) => {
    const newToWatchList = toWatchList.filter(
      (toWatchMovie) => toWatchMovie.id !== movie.id
    );
    setToWatchList(newToWatchList);
  };

  // Compile context
  const contextValue = {
    baseUrl,
    movieList,
    populateMovieList,
    recommendations,
    populateRecommendations,
    toWatchList,
    addMovieToWatchList,
    removeMovieFromWatchList,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
