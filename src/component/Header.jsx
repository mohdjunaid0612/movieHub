import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header bg-white">
      <div className="container">
        <div className="inlineHeader">
          <Link to="/">
            <h2 className="text-info">
              Movie<span className="text-warning">Hub</span>
            </h2>
          </Link>
          <div className="rightMenu d-flex gap-3">
            <Link to="/" className="fw-bold text-black">
              Movies
            </Link>
            <Link to="/" className="fw-bold text-black">
              Tv Shows
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
