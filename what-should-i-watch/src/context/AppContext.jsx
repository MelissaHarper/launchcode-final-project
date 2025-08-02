import { createContext, useContext, useState } from "react";
import AddToWatchList from "../components/services/AddToWatchList";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const baseUrl = "http://localhost:8080/api";
  // const baseUrl = "widely-endless-basilisk.ngrok-free.app/api";

  // Persist data in localStorage
  const [movieList, setMovieList] = useState(() => {
    const saved = localStorage.getItem("movieList");
    return saved ? JSON.parse(saved) : [];
  });

  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem("recommendations");
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

  // To watch list contexts
  const [toWatchList, setToWatchList] = useState(() => {
    const saved = localStorage.getItem("toWatchList");
    return saved ? JSON.parse(saved) : [];
  });

  const addToWatchList = (movie) => {
    const newToWatchList = [...toWatchList, movie];
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
    addToWatchList,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
