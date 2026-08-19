import { Link } from "react-router-dom";
import logo from "../assets/images/PickQuickLogo.png";
import "../styles/NavBar-Footer.css";

function NavBar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <img className="nav-logo" src={logo} />
      </div>
      <div className="rightSide">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
