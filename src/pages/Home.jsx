import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const api_key = "f10aa479e5ca194f545036149368f781";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchMovie = async () => {
      const api = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${page}`
      );
      const data = await api.json();
      setMovies(data.results);
    };

    fetchMovie();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);
  return (
    <Layout>
      <div className="container">
        <h3 className="text-warning text-center my-4 ">Latest Movies</h3>
        <div className="row">
          {movies.map((data) => (
            <div className="col-lg-3 col-lg-3 mb-3">
              <div className="p-2 border itemMovie rounded h-100" key={data.id}>
                <Link to={`/movie/${data.id}`}>
                  <div className="imgBox rounded mb-3 ">
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${data.backdrop_path}`}
                      className="w-100 rounded"
                    />
                  </div>
                  <h5>{data.title}</h5>
                  <h6 className="text-warning">
                    {new Date(data.release_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </h6>
                  <p className="fw-bold">{data.category}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center my-3">
          <button
            className="btn btn-info mx-2"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="btn btn-info mx-2"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
