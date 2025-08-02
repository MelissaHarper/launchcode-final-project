import { Link } from "react-router-dom";
import Dummy from "../assets/images/logo.png";
import { useAppContext } from "../context/AppContext.jsx";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import "../styles/recommend-movieCard.css";
import AddToWatchList from "./services/AddToWatchList.jsx";

const MovieCard = ({ movie }) => {
  const { addMovieToWatchList } = useAppContext();
  const handleToWatchClick = addMovieToWatchList;

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
        <div
          className="overlay"
          onClick={() => handleToWatchClick(movie.id)}
        ></div>
        <AddToWatchList />
      </div>
      <Link to={`/selection/movie/detail/${movie.id}`} className="movie-title">
        {movie.title || movie.name}
      </Link>
    </div>
  );
};

export default MovieCard;
