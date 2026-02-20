import { useParams } from "react-router-dom";
import { useMovie } from "../context/SMovieContext.jsx";
import { useEffect } from "react";

function Row({ label, value }) {
    if (!value || value === "N/A") return null;
    return (
        <p className="mb-2">
            <b>{label}:</b> {value}
        </p>
    );
}

function SpecificMoviePage() {
    const { movieId } = useParams();
    const { smovie, sloading, fetchMovie } = useMovie();

    useEffect(() => {
        fetchMovie(movieId);
    }, [movieId, fetchMovie]);

    if (sloading) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    if (!smovie) {
        return (
            <div className="alert alert-danger mt-3">
                Error occurred! Movie details not found!
            </div>
        );
    }

    const ratings = Array.isArray(smovie.Ratings) ? smovie.Ratings : [];

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header">
                <h4 className="mb-0">
                    {smovie.Title} ({smovie.Year})
                </h4>
                <div className="text-muted">
                    {smovie.Type?.toUpperCase()} • {smovie.Rated !== "N/A" ? smovie.Rated : null}
                    {smovie.Runtime !== "N/A" ? ` • ${smovie.Runtime}` : ""}
                    {smovie.Released !== "N/A" ? ` • Released: ${smovie.Released}` : ""}
                </div>
            </div>

            <div className="card-body container">
                <div className="row g-4">
                    <div className="col-12 col-md-4">
                        {smovie.Poster && smovie.Poster !== "N/A" ? (
                            <img
                                src={smovie.Poster}
                                alt={`${smovie.Title} poster`}
                                className="img-fluid rounded"
                            />
                        ) : (
                            <div className="border rounded p-4 text-center text-muted">
                                No poster
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-md-8">
                        {/* Plot */}
                        {smovie.Plot && smovie.Plot !== "N/A" ? (
                            <>
                                <h5>Description:</h5>
                                <p className="mb-3">{smovie.Plot}</p>
                            </>
                        ) : null}

                        {/* Main info */}
                        <h5 className="mt-3">Details:</h5>
                        <Row label="Genre" value={smovie.Genre} />
                        <Row label="Director" value={smovie.Director} />
                        <Row label="Writer" value={smovie.Writer} />
                        <Row label="Actors" value={smovie.Actors} />
                        <Row label="Language" value={smovie.Language} />
                        <Row label="Country" value={smovie.Country} />
                        <Row label="Awards" value={smovie.Awards} />
                        <Row label="Production" value={smovie.Production} />

                        {/* Ratings */}
                        {ratings.length > 0 ? (
                            <>
                                <h5 className="mt-3">Ratings:</h5>
                                <ul className="mb-3">
                                    {ratings.map((r) => (
                                        <li key={r.Source}>
                                            <b>{r.Source}:</b> {r.Value}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : null}

                        {/* Numbers */}
                        <h5 className="mt-3">Numbers:</h5>
                        <Row label="IMDB Rating" value={smovie.imdbRating} />
                        <Row label="IMDB Votes" value={smovie.imdbVotes} />
                        <Row label="Metascore" value={smovie.Metascore} />
                        <Row label="BoxOffice" value={smovie.BoxOffice} />

                        {/* Extra */}
                        <h5 className="mt-3">Extra</h5>
                        <Row label="Released (DVD)" value={smovie.DVD} />

                        {smovie.Website && smovie.Website !== "N/A" ? (
                            <p className="mb-0">
                                <b>Website:</b>{" "}
                                <a href={smovie.Website} target="_blank" rel="noreferrer">
                                    {smovie.Website}
                                </a>
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecificMoviePage;