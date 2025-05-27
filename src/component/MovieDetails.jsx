import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircleScore from "./CircleScore";
import { Youtube } from "react-bootstrap-icons";

const api_key = "f10aa479e5ca194f545036149368f781";
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [modalKey, setModalKey] = useState(0);

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
  }, [id]);
  if (!movie) {
    return <p>Loading movie details...</p>;
  }
  return (
    <>
      <section
        className="py-lg-5"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1920${movie.backdrop_path})`,
        }}
      >
        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-4">
              <img
                src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                alt={movie.title}
                className="w-100 rounded"
              />
            </div>
            <div className="col-lg-8 ps-lg-5">
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
                    <Youtube className="text-danger" size={20} /> Play Trailer
                  </button>
                  <small className="mt-2 d-block">
                    Trailer from youtube their original youtube channel
                  </small>
                </div>
              </div>
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
    </>
  );
};

export default MovieDetails;
