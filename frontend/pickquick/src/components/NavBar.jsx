import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import logo from "../assets/images/PickQuickLogoSmall.png";
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

        <Link className="nav-link" to="/about">
          About
        </Link>
        <SignedIn>
          <Link className="nav-link" to="/userDashboard">
            User Dashboard
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton className="button-navbar" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default NavBar;
