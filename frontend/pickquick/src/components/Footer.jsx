import { Link } from "react-router";
import tmdbLogo from "../assets/images/tmdb-logo.svg";
import "../styles/NavBar-Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="tmdb-attribution">
        <img
          className="tmdb-logo"
          src={tmdbLogo}
          alt="Logo for The Movie Database"
        />
        <p className="tmdb-notice">
          This product uses the TMDB API and data provided by JustWatch but it
          is not endorsed or certified by TMDB or JustWatch.
        </p>
      </div>
      <Link className="footer-link" to="/feedback">
        Feedback
      </Link>

      <div className="box-travel"></div>
    </footer>
  );
};

export default Footer;
