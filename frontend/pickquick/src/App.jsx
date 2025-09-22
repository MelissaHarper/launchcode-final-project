import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Feedback from "./components/Feedback";
import FilterContainer from "./components/filter-components/FilterContainer";
import Footer from "./components/Footer";
import UserDashboard from "./components/gated/UserDashboard";
import Home from "./components/Home";
import MovieCard from "./components/movie-components/MovieCard";
import Recommendations from "./components/movie-components/Recommendations";
import Selection from "./components/movie-components/Selection";
import ScrollToTop from "./components/ScrollToTop";
import NavBar from "./components/NavBar";
import { memo } from "react";

function App() {
  return (
    <main>
      <div className="App">
        <ScrollToTop />
        <NavBar />
        <div className="body-content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/filterContainer" element={<FilterContainer />} />
            <Route path="/movieCard" element={<MovieCard />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/selection/:type/detail/:id" element={<Selection />} />
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <UserDashboard />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default memo(App);
