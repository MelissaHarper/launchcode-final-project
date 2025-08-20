import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Dummy from "../../assets/images/logo.png";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import "../../styles/recommend-movieCard.css";
import AddToWatchList from "../services/AddToWatchList.jsx";
import RemoveFromWatchList from "../services/RemoveFromToWatchList.jsx";
import { BackendContext } from "../../context/UserSyncHandler.jsx";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useFitText } from "../services/utils.js";

const MovieCard = ({ movie }) => {
  const { handleToWatchClick, checkToWatchList, toWatchList } =
    useContext(BackendContext);
  const [isInToWatchList, setIsInToWatchList] = useState(false);
  const titleRef = useFitText(24);

  useEffect(() => {
    movie && setIsInToWatchList(checkToWatchList(movie));
  }, [toWatchList, movie, checkToWatchList, isInToWatchList]);

  return (
    <div className="movie-card">
      <div className="poster-container">
        <Link
          className="link-to-selection"
          to={`/selection/movie/detail/${movie.id}`}
        >
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
        <SignedIn>
          {!isInToWatchList ? (
            <div
              className="overlay"
              onClick={(e) => {
                e.preventDefault(), handleToWatchClick(movie);
              }}
            >
              <AddToWatchList />
            </div>
          ) : (
            <div
              className="overlay"
              onClick={(e) => {
                e.preventDefault;
                handleToWatchClick(movie);
              }}
            >
              <RemoveFromWatchList />
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <div
            className="overlay"
            onClick={(e) => {
              e.preventDefault(), handleToWatchClick(movie);
            }}
          >
            <p>Sign in to add this movie to your watchlist</p>
          </div>
        </SignedOut>
      </div>
      <div className="movie-title-container">
        <div className="movie-title" ref={titleRef}>
          {movie.title || movie.name}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
