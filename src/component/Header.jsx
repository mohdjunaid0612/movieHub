import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searcbar, setSearchbar] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() == "") return;
    const formattedQuery = encodeURIComponent(query.trim()).replace(
      /%20/g,
      "+"
    );
    navigate(`/search/${formattedQuery}`);
  };

  return (
    <header className="header bg-white sticky-top shadow">
      <div className="container">
        <div className="inlineHeader">
          <div className="leftLogo d-flex gap-4 align-items-center">
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
          <div className="d-flex">
            <button
              onClick={() => setSearchbar(!searcbar)}
              className="btn bg-black text-info pb-2"
            >
              <i className="fa fa-search"></i>
            </button>
            {searcbar && (
              <div className="searchBar">
                <button
                  onClick={() => setSearchbar(!searcbar)}
                  className="btnClose text-white"
                >
                  <i className="fa fa-close"></i>
                </button>
                <form className="gap-3" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="form-control"
                    placeholder="Search for a movie, tv shows"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button className="btn btn-warning py-3 px-4">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
