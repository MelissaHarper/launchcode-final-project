import FilterContainer from "./FilterContainer";
import hero from "../assets/images/PickQuickLogo.png";
import "../App.css";

function Home() {
  return (
    <div className="home">
      <div className="hero-div">
        <img className="hero" src={hero} alt="PickQuick logo" />
      </div>
      <div className="card-list">
        <div className="card">
          Our goal is to reduce decision fatigue by giving fast, relevant, and
          fun recommendations without endlessly scrolling through streaming
          platforms.
        </div>
        <div className="card">
          Below, select the genres and streaming providers you'd like to include
          in the results.
        </div>
        <div className="card">
          Hit submit and we'll give you 5 movie choices.
        </div>
        <div className="card">
          Click on a movie poster to get more information
        </div>
        <div className="card">
          Use our secure sign-in and add movies to your personal watchlist
        </div>
      </div>

      <FilterContainer />
    </div>
  );
}

export default Home;
