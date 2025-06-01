import React from "react";
// import Movie from "./component/Movie";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import SearchResult from "./pages/SearchResult";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search/:query" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
