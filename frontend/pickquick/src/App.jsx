import { memo, lazy, Suspense } from "react";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";
import FilterContainer from "./components/filter-components/FilterContainer";
import Footer from "./components/Footer";
import Home from "./components/Home";
import MovieCard from "./components/movie-components/MovieCard";
import Recommendations from "./components/movie-components/Recommendations";
import ScrollToTop from "./components/ScrollToTop";
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
const UserDashboard = lazy(() => import("./components/gated/UserDashboard"));
const Selection = lazy(() => import("./components/movie-components/Selection"));
const About = lazy(() => import("./components/About"));
const Feedback = lazy(() => import("./components/Feedback"));

function App() {
  return (
    <main>
      <div className="App">
        <ScrollToTop />
        <NavBar />
        <div className="body-content">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/filterContainer" element={<FilterContainer />} />
              <Route path="/movieCard" element={<MovieCard />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route
                path="/selection/:type/detail/:id"
                element={<Selection />}
              />
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
          </Suspense>
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default memo(App);
