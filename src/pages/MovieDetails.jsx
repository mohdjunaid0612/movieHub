import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CircleScore from "../component/CircleScore";
import { Youtube } from "react-bootstrap-icons";
import Layout from "../layout/Layout";
import Loader from "../component/Loader";

const api_key = "f10aa479e5ca194f545036149368f781";
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [modalKey, setModalKey] = useState(0);
  const [cast, setCast] = useState([]);

  const resetVideo = () => {
    setModalKey((prev) => prev + 1);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
    // trailer
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        const officialTrailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(officialTrailer);
      });

    // for cast
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setCast(data.cast.slice(0, 9)));
  }, [id]);
  if (!movie) {
    return <Loader />;
  }
  return (
    <Layout>
      <section
        className="py-lg-5 movieBanner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1920${movie.backdrop_path})`,
        }}
      >
        <div className="container mt-3">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <img
                src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                alt={movie.title}
                className="w-100 rounded d-none d-md-block"
              />
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
            </div>
            <div className="col-lg-8 ps-lg-5 pt-lg-0 pt-4">
              <h1>
                {movie.title}{" "}
                <span style={{ fontWeight: 400, color: "yellow" }}>
                  {movie.release_date.slice(0, 4)}
                </span>
              </h1>
              <span className="pe-2">
                {new Date(movie.release_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                ({movie.original_language})
              </span>
              {movie.genres.map((genre, indx) => (
                <span key={genre.id}>{genre.name}, </span>
              ))}
              <span>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
              <div className="d-flex mt-4 gap-5">
                <div className="circle d-flex align-items-center gap-3">
                  <CircleScore score={movie.vote_average} />
                  <p className="fw-bold">
                    User
                    <br /> Score
                  </p>
                </div>
                <div className="btnBlock">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    className="btn btn-light"
                  >
                    <Youtube className="text-danger" size={20} /> Watch Trailer
                  </button>
                  <small className="mt-2 d-block">
                    Trailer from youtube their original youtube channel
                  </small>
                </div>
              </div>
              <p className="h5 text-secondary mt-4">
                <i>{movie.tagline}</i>
              </p>
              <p className="mt-3 text-info h6">Overview</p>
              <p>{movie.overview}</p>
              <p className="mt-3 h6 text-info">Production</p>
              <ul className="d-flex ms-0 ps-3 flex-wrap">
                {movie.production_companies.map((production) => (
                  <li className="me-5" key={production.id}>
                    {production.name}
                  </li>
                ))}
              </ul>
              <p className="mt-3 h6 text-info">
                Revenue (worldwide box office collection)
              </p>
              <p>${(movie.revenue / 1_000_000).toFixed(1)} Million USD</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-lg-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="leftCast">
                <h3>Top Billed Cast</h3>
                <div className="castBlock">
                  {cast.map((actor) => (
                    <div className="itemCast mb-3 shadow" key={cast.id}>
                      <Link
                        to={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                          actor.name
                        )}`}
                        target="_blank"
                      >
                        <div className="itemCastInner">
                          {!actor.profile_path ? (
                            <div className="emptyProfile">
                              <i className="fa fa-user"></i>
                            </div>
                          ) : (
                            <>
                              <img
                                src={`https://media.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`}
                                alt={actor.name}
                                className="w-100 d-none d-md-block"
                              />
                              <img
                                src={`https://media.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`}
                                alt={actor.name}
                                className="w-100 d-block d-md-none"
                              />
                            </>
                          )}
                          <div className="p-2">
                            <h6 className="text-black">{actor.name}</h6>
                            <p className="text-secondary">{actor.character}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-3 ps-lg-5 mt-md- mt-4">
              <h5>Status</h5>
              <p>{movie.status}</p>
              <h5 className="mt-3">Original Language</h5>
              <p>{movie.original_language.toUpperCase()}</p>
              <h5 className="mt-3">Vote Count</h5>
              <p>{movie.vote_count}</p>
              <h5 className="mt-3">Budget</h5>
              <p>${(movie.budget / 1_000_000).toFixed(1)} Million USD</p>
              <h5 className="mt-3">Revenue</h5>
              <p>${(movie.revenue / 1_000_000).toFixed(1)} Million USD</p>
            </div>
          </div>
        </div>
      </section>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        onHide={resetVideo}
        onClick={(e) => {
          if (e.target.classList.contains("btn-close")) {
            resetVideo();
          }
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {movie.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetVideo}
              ></button>
            </div>
            <div className="modal-body">
              {trailer && (
                <iframe
                  key={modalKey}
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetails;
