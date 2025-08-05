import FilterContainer from "./FilterContainer";
import hero from "../assets/images/PickQuickLogo.png";

function Home() {
  return (
    <div className="home">
      <div>
        <img src={hero} alt="PickQuick logo" />
      </div>

      <FilterContainer />
    </div>
  );
}

export default Home;
