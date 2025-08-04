import { createContext, useContext, useState } from "react";
import { BackendContext } from "../components/services/UserSyncHandler";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // const { addMovieToWatchList, removeMovieFromWatchList } =
  //   useContext(BackendContext);

  const [movieList, setMovieList] = useState(() => {
    const saved = localStorage.getItem("movieList");
    return saved ? JSON.parse(saved) : [];
  });

  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem("recommendations");
    return saved ? JSON.parse(saved) : [];
  });

  // const [toWatchList, setToWatchList] = useState([]);

  const populateMovieList = (list) => {
    setMovieList(list);
    localStorage.setItem("movieList", JSON.stringify(list));
  };

  const populateRecommendations = (list) => {
    setRecommendations(list);
    localStorage.setItem("recommendations", JSON.stringify(list));
  };

  // const populateToWatchList = (list) => {
  //   setToWatchList(list);
  // };

  // const checkToWatchList = (movie) => {
  //   if (!movie || !movie.id) return false; // ✅ Prevent null/undefined errors
  //   return toWatchList.some((m) => m && m.id === movie.id);
  // };

  // const handleToWatchClick = (movie) => {
  //   console.log(`WatchList length on click: ${toWatchList.length}`);
  //   if (checkToWatchList(movie)) {
  //     removeMovieFromWatchList(movie);
  //     console.log(`WatchList length after remove: ${toWatchList.length}`);
  //   } else {
  //     addMovieToWatchList(movie);
  //     console.log(`WatchList length after add: ${toWatchList.length}`);
  //   }
  // };

  return (
    <AppContext.Provider
      value={{
        movieList,
        populateMovieList,
        recommendations,
        populateRecommendations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
