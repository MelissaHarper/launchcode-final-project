import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [movieList, setMovieList] = useState();

  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem("recommendations");
    return saved ? JSON.parse(saved) : [];
  });

  const populateMovieList = (list) => {
    setMovieList(list);
    localStorage.setItem("movieList", JSON.stringify(list));
  };

  const populateRecommendations = (list) => {
    setRecommendations(list);
    localStorage.setItem("recommendations", JSON.stringify(list));
  };

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
