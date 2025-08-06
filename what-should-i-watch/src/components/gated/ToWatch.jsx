import { useEffect, useContext } from "react";
import { useUser } from "@clerk/clerk-react";
import MovieCard from "../MovieCard.jsx";
import { BackendContext } from "../../context/UserSyncHandler";

function ToWatch() {
  const { isSignedIn, user } = useUser();
  const { fetchWatchListFromBackend, toWatchList } = useContext(BackendContext);

  useEffect(() => {
    if (isSignedIn && user?.id) {
      fetchWatchListFromBackend();
    }
  }, [isSignedIn, user, fetchWatchListFromBackend]);

  if (!isSignedIn) {
    return <p>Please sign in to view your To Watch list.</p>;
  }

  if (toWatchList.length === 0) {
    return <p>Your To Watch list is empty.</p>;
  }

  return (
    <div className="to-watch-list">
      {toWatchList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
export default ToWatch;
