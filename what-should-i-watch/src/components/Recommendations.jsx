import MovieCard from "./MovieCard";
import "../styles/recommendations.css";

const Recommendations = (props) => {
  return (
    <div className="recommend-grid">
      <MovieCard props={props} />
      <MovieCard props={props} />
      <MovieCard props={props} />
      <MovieCard props={props} />
      <MovieCard props={props} />
    </div>
  );
};

export default Recommendations;
