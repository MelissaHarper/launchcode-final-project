import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getDetail,
  getCredits,
  getTrailers,
  getProviders,
} from "../services/call-functions";
import { options } from "../services/call-headers";
import SelectionDescription from "./SelectionDescriptionCard";
import SelectionCredits from "./SelectionsCreditsCard";
import SelectionTrailers from "./SelectionTrailersCard";
import "../../styles/Selection.css";
import SelectionPurchases from "./SelectionPurchaseCard";

const Selection = () => {
  const { type, id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [providers, setProviders] = useState(null);
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

      const resProviders = await getProviders(type || "", id || "", payload);
      if (resProviders.data) setProviders(resProviders.data);

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
      {!isLoading && (
        <div>
          <div className="section">
            <SelectionDescription movie={detail} providers={providers} />
          </div>

          <div className="credits-video-container">
            <div className="section">
              <p className="title">Cast</p>
              {<SelectionCredits credits={displayedCredits} />}
              {displayedCredits.length < allCredits.length && (
                <button className="reusable-button" onClick={handleLoadMore}>
                  Load More Cast
                </button>
              )}
            </div>
          </div>
          <div id="purchase-options">
            {trailers.length > 0 && (
              <div className="section">
                <p className="title">Trailers</p>
                {<SelectionTrailers trailers={trailers} />}
              </div>
            )}
            {(providers.results.US.rent || providers.results.US.buy) && (
              <SelectionPurchases providers={providers} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Selection;
