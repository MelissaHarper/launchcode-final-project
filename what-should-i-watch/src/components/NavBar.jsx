import { Link } from "react-router-dom";
import { useState } from "react";
// For future Clerk Authorization
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";
import Logo from "../assets/images/logo.png";
import Logo2 from "../assets/images/logo2.png";
import "../styles/NavBar-Footer.css";

function NavBar(props) {
  const [image, setImage] = useState(Logo);
  const { signedIn, authorizeClick } = props;

  function handleClick() {
    if (image === Logo) {
      setImage(Logo2);
    } else {
      setImage(Logo);
    }
  }

  return (
    <header>
      <div className="navbar">
        <div className="leftSide">
          <img className="nav-logo" src={image} onClick={handleClick} />
          <p className="site-name">What Should I Watch</p>
        </div>
        <div className="rightSide">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/feedback">
            Feedback
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
          {signedIn ? (
            <button className="dashboard" onClick={authorizeClick}>
              Sign Out
            </button>
          ) : (
            <button className="Sign In" onClick={authorizeClick}>
              Sign In
            </button>
          )}
          {/* // For future Clerk Authorization */}
          {/*
          <SignedOut>
            <SignInButton className="button-navbar" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
