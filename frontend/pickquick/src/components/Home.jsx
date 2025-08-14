import FilterContainer from "./FilterContainer";
import hero from "../assets/images/PickQuickLogo.png";
import "../App.css";

function Home() {
  return (
    <div className="home">
      <div className="hero-div">
        <img className="hero" src={hero} alt="PickQuick logo" />
      </div>

      <FilterContainer />
    </div>
  );
}

export default Home;
