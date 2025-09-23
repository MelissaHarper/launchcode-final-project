import { lazy, Suspense, useContext } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { useFitText } from "../services/utils.js";
import { BackendContext } from "../../context/BackendContext.jsx";
import Loading from "../Loading.jsx";
import "../../styles/recommend-movieCard.css";

const MovieCard = lazy(() => import("./MovieCard.jsx"));

const Recommendations = () => {
  const { openErrorModal } = useContext(BackendContext);
  const textRef = useFitText(24); // Max font size
  const {
    recommendations,
    handleEditSearch,
    handleNewSearch,
    handleFilterSubmit,
    isTouchScreen,
  } = useAppContext();

  return (
    <div>
      <div className="movie-grid">
        {recommendations.length > 0 ? (
          <Suspense fallback={<Loading />}>
            {recommendations.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isTouchScreen={isTouchScreen}
              />
            ))}
          </Suspense>
        ) : (
          openErrorModal(
            `Sorry, no movies match your search. Click "Edit Search" to revise your filters or "New Search" to start again.`
          )
        )}
      </div>
      <div className="search-nav-container" ref={textRef}>
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
