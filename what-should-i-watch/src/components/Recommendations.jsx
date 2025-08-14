import { useAppContext } from "../context/AppContext.jsx";
import MovieCard from "./MovieCard";
import "../styles/recommend-movieCard.css";

const Recommendations = () => {
  const { recommendations } = useAppContext();

  // console.log(
  //   `Recommendations length from Recommendations coponent: ${recommendations.length}`
  // );
  // console.log(
  //   `First movie id and poster path from Recommendations coponent: ${recommendations[0].id}, ${recommendations[0].poster_path}`
  // );

  return (
    <div className="movie-grid">
      {recommendations.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Recommendations;
