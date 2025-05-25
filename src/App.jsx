import React, { useState } from "react";
import { movies } from "./data";
const App = () => {
  const [moviesList, setMoviesList] = useState(movies);

  const movieFilter = (cat) => {
    setMoviesList(movies.filter((data) => data.category == cat));
  };
  return (
    <>
      <div className="container">
        <h3 className="text-warning text-center pt-3">Movies Zone</h3>
        <div className="text-center my-4 flex flex-wrap">
          <button
            onClick={() => setMoviesList(movies)}
            className="btn btn-primary m-2"
          >
            All
          </button>
          <button
            onClick={() => movieFilter("Action")}
            className="btn btn-secondary m-2"
          >
            Action
          </button>
          <button
            onClick={() => movieFilter("Thriller")}
            className="btn btn-warning m-2"
          >
            Thriller
          </button>
          <button
            onClick={() => movieFilter("Animation")}
            className="btn btn-success m-2"
          >
            Animation
          </button>
          <button
            onClick={() => movieFilter("Drama")}
            className="btn btn-danger m-2"
          >
            Drama
          </button>
          <button
            onClick={() => movieFilter("Horror")}
            className="btn btn-info m-2"
          >
            Horror
          </button>
          <button
            onClick={() => movieFilter("Sci-Fi")}
            className="btn btn-light m-2"
          >
            Sci-Fi
          </button>
        </div>
        <div className="row">
          {moviesList.map((data) => (
            <div className="col-lg-3 mb-3">
              <div className="p-2 border itemMovie rounded h-100" key={data.id}>
                <div className="imgBox rounded mb-3">
                  <img src={data.backdrop_path} className="w-100 rounded" />
                </div>

                <h5>{data.title}</h5>
                <h6 className="text-warning">{data.release_date}</h6>
                <p className="fw-bold">{data.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
