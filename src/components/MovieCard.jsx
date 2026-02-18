import { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, isFavorite, toggleFavorite, setSelected, dark }) {
  const [hover, setHover] = useState(false);

  return (
      <div
          className={`card shadow-sm h-100 ${hover ? "scale" : ""} ${dark ? "dark" : ""}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{transition: "0.3s"}}
      >

          <Link
              to={`/movie/${movie.imdbID}`}
              className="text-decoration-none"
              style={{ cursor: "pointer" }}
          >
              <img src={movie.Poster} className="card-img-top" alt={`${movie.Title} poster`} />
          </Link>
        <div className="card-body">
            <h5 className="mb-3">
                <Link
                    to={`/movie/${movie.imdbID}`}
                    className={`${dark ? "text-light" : "text-dark"} text-decoration-none`}
                    style={{ cursor: "pointer" }}
                >
                    {movie.Title}
                </Link>
            </h5>

          <button
              className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"} me-2`}
              onClick={() => toggleFavorite(movie.imdbID)}
          >
            {isFavorite ? "Remove" : "Favorite"}
          </button>

          <button
              className="btn btn-primary"
              onClick={() => setSelected(movie)}
          >
            Details
          </button>
        </div>
      </div>
  );
}

export default MovieCard;
