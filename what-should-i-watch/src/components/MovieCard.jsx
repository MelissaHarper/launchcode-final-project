import { Link } from "react-router-dom";
import Dummy from "../assets/images/logo.png";
import { useAppContext } from "../context/AppContext.jsx";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import "../styles/recommend-movieCard.css";
import AddToWatchList from "./services/AddToWatchList.jsx";
import RemoveFromWatchList from "./services/RemoveFromToWatchList.jsx";

const MovieCard = ({ movie }) => {
  const { toWatchList, addMovieToWatchList, removeMovieFromWatchList } =
    useAppContext();
  const handleAddToWatchClick = addMovieToWatchList;
  const handleRemoveFromWatchClick = removeMovieFromWatchList;

  console.log(
    `Movie Id and poster path from MovieCard: ${movie.id}, ${movie.poster_path}`
  );

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

        {!toWatchList.includes(movie.id) ? (
          <div
            className="overlay"
            onClick={() => handleAddToWatchClick(movie.id)}
          >
            <AddToWatchList />
          </div>
        ) : (
          <div
            className="overlay"
            onClick={() => handleRemoveFromWatchClick(movie.id)}
          >
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
