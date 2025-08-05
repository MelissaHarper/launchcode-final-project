import { LazyLoadImage } from "react-lazy-load-image-component";
import DummyUser from "../assets/images/logo.png";
import "../styles/Selection.css";

const DetailCredits = ({ credits }) => {
  return (
    <div className="credits-container">
      {credits.map((credit, index) => (
        <div key={`credit-${index}`} className="credits-card">
          <LazyLoadImage
            src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${credit.profile_path}`}
            alt={credit.name}
            useIntersectionObserver={true}
            threshold={100}
            placeholderSrc={<div className="credits-placeholder" />}
            effect="black-and-white"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = DummyUser;
            }}
            className="credits-image"
          />
          <p className="credits-name">{credit.name}</p>
          <p className="credits-character">{credit.character}</p>
        </div>
      ))}
    </div>
  );
};

export default DetailCredits;
