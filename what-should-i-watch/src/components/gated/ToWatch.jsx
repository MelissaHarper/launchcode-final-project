import { useAppContext } from "../context/AppContext.jsx";

function ToWatch() {
  const { toWatchList } = useAppContext();

  return (
    <div className="movie-grid">
      {toWatchList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
export default ToWatch;
