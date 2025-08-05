import { useAppContext } from "../context/AppContext.jsx";
import MovieCard from "./MovieCard";
import "../styles/recommend-movieCard.css";

const Recommendations = () => {
  const { recommendations } = useAppContext();

  return (
    <div className="movie-grid">
      {recommendations.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Recommendations;
