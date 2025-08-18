import { useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import FilterContainer from "./FilterContainer";
import hero from "../assets/images/PickQuickLogo.png";
import "../App.css";

function Home() {
  const [active, setActive] = useState(1);

  const handleActive = (num) => {
    setActive(num);
  };

  return (
    <div className="home">
      <div className="hero-div">
        <img className="hero" src={hero} alt="PickQuick logo" />
      </div>
      <div className="card-list">
        <div className={active === 1 ? "card-active" : "card-from-right"}>
          <FiChevronLeft size={40} color="transparent" />
          Stop endlessly scrolling through streaming platforms and get fast,
          relevant recommendations.
          <FiChevronRight size={40} onClick={() => handleActive(2)} />
        </div>
        <div className={active === 2 ? "card-active" : "card-from-right"}>
          <FiChevronLeft size={40} onClick={() => handleActive(1)} />
          Below, select the genres and streaming providers you'd like to include
          in the results.
          <FiChevronRight size={40} onClick={() => handleActive(3)} />
        </div>
        <div className={active === 3 ? "card-active" : "card-from-right"}>
          <FiChevronLeft size={40} onClick={() => handleActive(2)} />
          You can click on any movie poster to get more information
          <FiChevronRight size={40} onClick={() => handleActive(4)} />
        </div>
        <div className={active === 4 ? "card-active" : "card-from-right"}>
          <FiChevronLeft size={40} onClick={() => handleActive(3)} />
          Sign-in to add movies to your personal watchlist
          <FiChevronLeft color="transparent" size={40} />
        </div>
      </div>

      <FilterContainer />
    </div>
  );
}

export default Home;
