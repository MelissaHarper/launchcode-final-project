import { useAppContext } from "../../context/AppContext.jsx";
import MovieCard from "./MovieCard.jsx";
import "../../styles/recommend-movieCard.css";

const Recommendations = () => {
  const {
    recommendations,
    handleEditSearch,
    handleNewSearch,
    handleFilterSubmit,
  } = useAppContext();
  console.log("Recommend page rendered");

  return (
    <div>
      <div className="movie-grid">
        {recommendations.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="search-nav-container">
        <div className="nav-button">
          <button onClick={handleEditSearch}>Edit Search</button>
        </div>
        <div className="nav-button">
          <button onClick={handleFilterSubmit}>New Recommendations</button>
        </div>
        <div className="nav-button">
          <button onClick={handleNewSearch}>New Search</button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
