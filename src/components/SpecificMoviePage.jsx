import {useParams} from "react-router-dom";
import {useMovie} from "../context/SMovieContext.jsx";
import {useEffect} from "react";

function SpecificMoviePage() {
    const {movieId} = useParams();
    const {smovie, sloading, fetchMovie} = useMovie();
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchMovie(movieId);
        }, 100);

        return () => clearTimeout(delay);
    }, []);
    return (
        <div className="card d-flex shadow-sm h-100 mt-3">
            {sloading ? (
                <div className="card-body">
                    <div className="text-center my-3">
                        <div className="spinner-border text-primary"></div>
                    </div>
                </div>

            ) : (<>
                    <div className="card-header">
                        <h5>{smovie.Title} - {smovie.Year}</h5>
                    </div>
                    <div className="card-body container">
                        <div className="row">
                            <div className="col-auto">
                                <img src={smovie.Poster} alt="Poster"/>
                            </div>
                            <div className="col-auto">
                                <div>
                                    <p><b>Released</b> {smovie.Released}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {!smovie ? (<>Error occurred! Movie details not found!</>) : (<></>)}
        </div>
    )
}

export default SpecificMoviePage;