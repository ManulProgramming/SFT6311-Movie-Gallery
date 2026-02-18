import { useState } from "react";

function MovieCard({ movie, isFavorite, toggleFavorite, setSelected, dark }) {
  const [hover, setHover] = useState(false);

  return (
      <div
          className={`card shadow-sm h-100 ${hover ? "scale" : ""} ${dark ? "dark" : ""}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{transition: "0.3s"}}
      >
        <img src={movie.Poster} className="card-img-top"/>
        <div className="card-body">
          <h5>{movie.Title}</h5>

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
