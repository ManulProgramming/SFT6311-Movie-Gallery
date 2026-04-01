import React, { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";

const MovieCardContext = createContext();
export const useMovieCard = () => useContext(MovieCardContext);

function MovieCard({ movie, isFavorite, toggleFavorite, open, dark, children }) {
    const [hover, setHover] = useState(false);

    return (
        <MovieCardContext.Provider
            value={{ movie, isFavorite, toggleFavorite, open, dark, hover }}
        >
            <div
                className={`card shadow-sm h-100 ${hover ? "scale" : ""} ${dark ? "dark" : ""}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ transition: "0.3s" }}
            >
                {children}
            </div>
        </MovieCardContext.Provider>
    );
}
MovieCard.Header = function Header() {
    const { movie } = useContext(MovieCardContext);

    return (
        <Link
            to={`/movie/${movie.index}`}
            className="text-decoration-none"
        >
            <img
                src={movie.Poster_Url}
                className="card-img-top"
                alt={`${movie.Title} poster`}
            />
        </Link>
    );
};
MovieCard.Body = function Body() {
    const { movie, dark } = useContext(MovieCardContext);

    return (
        <div className="card-body">
            <h5 className="mb-3">
                <Link
                    to={`/movie/${movie.index}`}
                    className={`${dark ? "text-light" : "text-dark"} text-decoration-none`}
                >
                    {movie.Title}
                </Link>
            </h5>
        </div>
    );
};
MovieCard.Footer = function Footer() {
    const { movie, isFavorite, toggleFavorite, open } = useContext(MovieCardContext);

    return (
        <div className="card-body pt-0">
            <button
                className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"} me-2`}
                onClick={() => toggleFavorite(movie.index)}
            >
                {isFavorite ? "Remove" : "Favorite"}
            </button>

            <button
                className="btn btn-primary"
                onClick={() => open(movie)}
            >
                Details
            </button>
        </div>
    );
};
const MemoizedMovieCard = React.memo(MovieCard);

MemoizedMovieCard.Header = MovieCard.Header;
MemoizedMovieCard.Body = MovieCard.Body;
MemoizedMovieCard.Footer = MovieCard.Footer;

export default MemoizedMovieCard;