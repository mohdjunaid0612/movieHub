import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
const api_key = "f10aa479e5ca194f545036149368f781";
const SearchResult = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResult = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(
            query.trim()
          )}`
        );
        const data = await res.json();
        setResults(data.results);
      } catch (err) {
        console.log("Error fetching search result:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResult();
  }, [query]);
  if (loading) return <Loader />;
  return (
    <Layout>
      <section className="py-lg-5 py-4">
        <div className="container">
          <h2 className="text-xl mb-4">Search results for: "{query}"</h2>
          {results.length > 0 ? (
            results.map((movie) => (
              <div
                className="itemResult mt-3 border p-lg-3 p-2 rounded"
                key={movie.id}
              >
                <Link to={`/movie/${movie.id}`}>
                  <div className="row">
                    <div className="col-lg-2">
                      {!movie.backdrop_path ? (
                        <div className="emptyImg">
                          <i className="fa fa-image"></i>
                        </div>
                      ) : (
                        <img
                          src={`https://image.tmdb.org/t/p/w400/${movie.backdrop_path}`}
                          alt={movie.title}
                          className="w-100 rounded d-block d-md-none"
                        />
                      )}
                      <img
                        src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                        alt={movie.title}
                        className="w-100 rounded d-none d-md-block"
                      />
                    </div>
                    <div className="col-lg-10 text-white">
                      <h3 className="mt-3 mt-md-0">{movie.title}</h3>
                      <p className="fw-bold mt-3">
                        Release Date:{" "}
                        {new Date(movie.release_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="mt-2">{movie.overview}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SearchResult;
