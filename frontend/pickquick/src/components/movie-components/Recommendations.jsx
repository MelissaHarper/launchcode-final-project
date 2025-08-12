import { useAppContext } from "../../context/AppContext.jsx";
import MovieCard from "./MovieCard.jsx";
import "../../styles/recommend-movieCard.css";

const Recommendations = () => {
  const { recommendations, handleEditSearchClick, handleNewSearchClick } =
    useAppContext();

  return (
    <div>
      <div className="movie-grid">
        {recommendations.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="edit-search">
        <button onClick={handleEditSearchClick}>Edit Search</button>
      </div>
      <div className="new-search">
        <button onClick={handleNewSearchClick}>New Search</button>
      </div>
    </div>
  );
};

export default Recommendations;
