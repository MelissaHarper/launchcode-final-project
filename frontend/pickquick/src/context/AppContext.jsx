import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { getWithFilters } from "../components/services/call-functions.js";
import { options } from "../components/services/call-headers.js";
import { getRandomMovies } from "../components/services/utils.js";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [movieList, setMovieList] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [isTouchScreen, setIsTouchScreen] = useState();
  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem("recommendations");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  window.addEventListener(
    "touchstart",
    function onFirstTouch() {
      setIsTouchScreen(true);
      window.removeEventListener("touchstart", onFirstTouch, false);
    },
    false
  );

  const populateMovieList = (list) => {
    setMovieList(list);
    localStorage.setItem("movieList", JSON.stringify(list));
  };

  const populateRecommendations = (list) => {
    setRecommendations(list);
    localStorage.setItem("recommendations", JSON.stringify(list));
  };

  const handleEditSearch = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleNewSearch = (e) => {
    e.preventDefault();
    setSelectedGenres([]);
    setSelectedProviders([]);
    navigate("/");
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    const genreIds = selectedGenres.map((genre) => genre.id);

    const providerIds = selectedProviders.map((provider) => provider.id);

    const movies = await getWithFilters(
      "movie",
      genreIds,
      providerIds,
      options
    );
    populateMovieList(movies);

    const randomFive = getRandomMovies(movies, 5);
    populateRecommendations(randomFive);
    navigate(`/recommendations`);
  };

  return (
    <AppContext.Provider
      value={{
        movieList,
        populateMovieList,
        recommendations,
        populateRecommendations,
        selectedGenres,
        setSelectedGenres,
        selectedProviders,
        setSelectedProviders,
        handleEditSearch,
        handleNewSearch,
        handleFilterSubmit,
        isTouchScreen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
