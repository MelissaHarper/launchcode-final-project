import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Dummy from "../assets/images/logo.png";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import "../styles/recommend-movieCard.css";
import AddToWatchList from "./services/AddToWatchList.jsx";
import RemoveFromWatchList from "./services/RemoveFromToWatchList.jsx";
import { BackendContext } from "../context/UserSyncHandler.jsx";

const MovieCard = ({ movie }) => {
  const { handleToWatchClick, checkToWatchList, toWatchList } =
    useContext(BackendContext);
  const [isInToWatchList, setIsInToWatchList] = useState(false);

  // Check if movie is in watch list if movie or watch list changes
  useEffect(() => {
    if (movie) {
      setIsInToWatchList(checkToWatchList(movie));
    }
  }, [toWatchList, movie, checkToWatchList]);

  return (
    <div className="movie-card">
      <div className="poster-container">
        <Link to={`/selection/movie/detail/${movie.id}`}>
          <img
            className="poster"
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
            alt={movie.title || movie.original_title || movie.original_name}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = Dummy;
            }}
          />
        </Link>

        {!isInToWatchList ? (
          <div className="overlay" onClick={() => handleToWatchClick(movie)}>
            <AddToWatchList />
          </div>
        ) : (
          <div className="overlay" onClick={() => handleToWatchClick(movie)}>
            <RemoveFromWatchList />
          </div>
        )}
      </div>

      <Link to={`/selection/movie/detail/${movie.id}`} className="movie-title">
        {movie.title || movie.name}
      </Link>
    </div>
  );
};

export default MovieCard;
