import { Link } from "react-router-dom";
import { useState } from "react";
import Dummy from "../assets/images/logo.png";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import { getRandomElement } from "./services/utils";
import "../styles/movieCard.css";
import AddToWatchList from "./services/AddToWatchList";

const MovieCard = (props) => {
  const {
    movieList,
    setMovieList,
    toWatch,
    setToWatch,
    toWatchComponent,
    handleToWatchClick,
  } = props;

  let movie = getRandomElement(movieList);
  const ToWatchList = props.toWatchList;

  const addToWatchList = (movie) => {
    const newToWatch = [...toWatch, movie];
    setToWatch(newToWatch);
  };

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
        <div className="overlay" onClick={handleToWatchClick}>
          <ToWatchList
            handleToWatchClick={addToWatchList}
            toWatchComponent={AddToWatchList}
          />
        </div>
      </div>
      <Link to={`/selection/movie/detail/${movie.id}`} className="movie-title">
        {movie.title || movie.name}
      </Link>
      {/* <div className="info-container">
        <Link
          to={`/selection/movie/detail/${movie.id}`}
          className="movie-title"
        >
          {movie.title || movie.name}
        </Link>
        <Link
          to={`/selection/movie/detail/${movie.id}`}
          className="description"
        >
          {movie.overview}
        </Link>
        <ul className="extra-info">
          <li>
            {movie.release_date?.split("-")[0] ||
              movie.first_air_date?.split("-")[0]}
          </li>

          <li>
            {movie.imdb_rating > 0 && (
              <>
                <>{`
            IMDB Rating: ${String(movie.imdb_rating).substring(0, 3)}`}</>
              </>
            )}
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default MovieCard;
