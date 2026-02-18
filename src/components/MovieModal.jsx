import ReviewManager from "./ReviewManager";
import RatingTimer from "./RatingTimer";
import {useEffect} from "react";
import {useMovie} from "../context/SMovieContext.jsx";


function MovieModal({movie, close}) {
    const {smovie, sloading, fetchMovie} = useMovie();
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchMovie(movie.imdbID);
        }, 100);

        return () => clearTimeout(delay);
    }, []);
    return (

        <div className="modal modal-overlay show d-block" onClick={close}>
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>{movie.Title}</h5>
                        <button className="btn-close" onClick={close}></button>
                    </div>

                    <div className="modal-body">
                        {sloading ? (
                                <div className="text-center my-3">
                                    <div className="spinner-border text-primary"></div>
                                </div>

                        ) : (<>
                                <p>{smovie.Plot}</p>
                                <p><b>Creator</b> {smovie.Director}</p>
                                <p><b>Genre</b> {smovie.Genre}</p>
                            <RatingTimer rating={smovie.imdbRating}/>
                            <ReviewManager movieId={smovie.imdbID}/>
                            </>)}
                        {!smovie ? (<>Error occurred! Movie details not found!</>) : (<></>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;
















