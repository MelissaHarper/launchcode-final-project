import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import FilterContainer from "./components/FilterContainer";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Selection from "./components/movie-components/Selection";
import Recommendations from "./components/movie-components/Recommendations";
import Feedback from "./components/Feedback";
import MovieCard from "./components/movie-components/MovieCard";
import UserDashboard from "./components/gated/UserDashboard";

function App() {
  return (
    <main>
      <div className="App">
        <NavBar />
        <div className="body-content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/filterContainer" element={<FilterContainer />} />
            <Route path="/movieCard" element={<MovieCard />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/selection/:type/detail/:id" element={<Selection />} />
            <Route path="/userDashboard" element={<UserDashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default App;
