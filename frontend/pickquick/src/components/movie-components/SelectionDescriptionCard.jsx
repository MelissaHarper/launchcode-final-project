import { useAppContext } from "../../context/AppContext";
import { tmdbImgBaseUrl } from "../services/call-headers.js";
import { Link } from "react-router";
import Dummy from "../../assets/images/PickQuickLogo.png";
import "../../styles/Selection.css";
import { HashLink } from "react-router-hash-link";

const DetailDescription = ({ movie, providers }) => {
  const releaseDate = movie
    ? movie.release_date
      ? movie.release_date.split("-")[0]
      : movie.first_air_date
      ? movie.first_air_date.split("-")[0]
      : ""
    : "";

  const onErrorImage = (e) => (e.target.src = Dummy);
  const { handleNewSearch } = useAppContext();
  return (
    <>
      {/* Banner */}
      {movie.backdrop_path ? (
        <div className="relative">
          <img
            src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
            alt={movie.name}
            className="backdrop"
          />
          <div className="backdrop-gradient" />
        </div>
      ) : (
        <div className="relative">
          <img src={Dummy} alt={movie.name} className="backdrop" />
          <div className="backdrop-gradient" />
        </div>
      )}

      <div className="selection-detail-container">
        {/* Poster */}
        <div className="selection-poster-container">
          <img
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="selection-poster"
            onError={onErrorImage}
          />
          <img
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="poster-blur"
            onError={onErrorImage}
          />
          <div className="search-navigation-container">
            <Link to="/">
              <div className="search-navigation">Edit Search</div>
            </Link>
            <Link onClick={handleNewSearch}>
              <div className="search-navigation">New Search</div>
            </Link>
            <Link to="/recommendations">
              <div className="search-navigation">Return to Recommendations</div>
            </Link>
          </div>
        </div>

        <div className="selection-description-container">
          {/* Title */}
          <p className="selection-movie-title">
            {movie.original_name || movie.original_title}
          </p>

          {/* Release year */}
          {movie.spoken_languages.length > 0 && (
            <p className="year-language">{releaseDate}</p>
          )}

          {/* Genres */}
          <div className="genre-container">
            {movie.genres.map((genre) => (
              <div key={genre.id} className="genre">
                {genre.name}
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="selection-description">{movie.overview}</p>

          {/* Providers */}

          {providers.results.US.flatrate ? (
            <div>
              <p className="streaming">Streaming</p>
              <div className="selection-provider-container">
                {providers.results.US.flatrate.map((provider) => (
                  <div key={provider.provider_id} className="provider">
                    <img
                      className="provider-image"
                      src={`${tmdbImgBaseUrl}${provider.logo_path}`}
                      alt={provider.provider_name}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <HashLink
              className="to-purchase-link"
              to={`/selection/movie/detail/${movie.id}/#purchase-options`}
              smooth
              duration={500}
              style={{ cursor: "pointer" }}
            >
              Purchase Options
            </HashLink>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailDescription;
