import { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import { getDetail, getCredits, getTrailers } from "./services/call-functions";
import { options } from "./services/call-headers";
import SelectionDescription from "./SelectionDescriptionCard";
import SelectionCredits from "./SelectionsCreditsCard";
import SelectionTrailers from "./SelectionTrailersCard";
import "../styles/Selection.css";

const Selection = () => {
  const { type, id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [allCredits, setAllCredits] = useState([]);
  const [visibleCreditsCount, setVisibleCreditsCount] = useState(5);
  const payload = options;

  const displayedCredits = allCredits.slice(0, visibleCreditsCount);

  const handleLoadMore = () => {
    setVisibleCreditsCount((prev) => prev + 5);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const resData = await getDetail(type || "", id || "", payload);
      if (resData.data) setDetail(resData.data);

      const resCredits = await getCredits(type || "", id || "", payload);
      if (resCredits.data) setAllCredits(resCredits.data.cast);

      const resTrailers = await getTrailers(type || "", id || "", payload);
      if (resTrailers.data?.results?.length > 0) {
        setTrailers(
          resTrailers.data.results
            .filter(
              (trailer) =>
                trailer.site === "YouTube" &&
                (trailer.type === "Teaser" || trailer.type === "Trailer") &&
                trailer.official
            )
            .slice(0, 5)
        );
      }

      setIsLoading(false);
    };

    fetchData();
  }, [type, id, payload]);

  return (
    <>
      {!isLoading && <SelectionDescription movie={detail} />}

      <div className="credits-video-container">
        <div>
          <p className="title">Cast</p>
          {<SelectionCredits credits={displayedCredits} />}
          <button className="reusable-button" onClick={handleLoadMore}>
            Load More Cast
          </button>
        </div>

        {trailers.length > 0 && (
          <div>
            <p className="title">Trailers</p>
            {<SelectionTrailers trailers={trailers} />}
          </div>
        )}
      </div>

      <p> {!detail && "We messed up, click that button again."}</p>
    </>
  );
};

export default Selection;
