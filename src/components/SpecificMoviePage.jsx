import {redirect, useParams} from "react-router-dom";
import { useMovie } from "../context/SMovieContext.jsx";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import withAuth from "../hoc/withAuth.jsx";

// eslint-disable-next-line react-refresh/only-export-components
function SpecificMoviePage() {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const { smovie, setSMovie, sloading, error, fetchMovie, editMovie, deleteMovie } = useMovie();

    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const handleChange = (e) => {
      let regex = /.+/;
      if (e.target.name === "Release_Date") {
          regex = /^[1-2][0189][0-9][0-9]-[0-1][0-9]-[0-3][0-9]$/;
      }else if (e.target.name === "Genre") {
          regex = /^[a-zA-Z0-9_, -]+$/;
      }else if (e.target.name === "Poster") {
          regex = /^https?:\/\/[^\s/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|webp|svg|bmp|ico)(?:\?[^\s#]*)?(?:#[^\s]*)?$/;
      }
      let isValid = regex.test(e.target.value);
      if (isValid) {
          e.target.classList.add('is-valid');
          e.target.classList.remove('is-invalid');
      }else{
          e.target.classList.remove('is-valid');
          e.target.classList.add('is-invalid');
      }
      console.log(e.target.name)
    setSMovie({ ...smovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!smovie.Title) return;
    if (/^[1-2][0189][0-9][0-9]-[0-1][0-9]-[0-3][0-9]$/.test(smovie.Release_Date) && /^[a-zA-Z0-9_, -]+$/.test(smovie.Genre)
    && /^https?:\/\/[^\s/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|webp|svg|bmp|ico)(?:\?[^\s#]*)?(?:#[^\s]*)?$/.test(smovie.Poster_Url)) {
        editMovie({
            index: smovie.index,
            Release_Date: smovie.Release_Date,
            Title: smovie.Title,
            Overview: smovie.Overview,
            Original_Language: smovie.Original_Language,
            Genre: smovie.Genre,
            Poster_Url: smovie.Poster_Url
        });
    }
  };
  const handleDelete = (e) => {
      e.preventDefault();
      setFavorites(prev => prev.filter(f => f !== smovie.index));
      deleteMovie({index: smovie.index});
      navigate("/");
  }

    useEffect(() => {
        fetchMovie(movieId);
    }, []);

    if (sloading) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mt-3">
                Error occurred! {error}
            </div>
        )
    }

    if (!smovie) {
        return (
            <div className="alert alert-danger mt-3">
                Error occurred! Movie details not found!
            </div>
        );
    }

    let Release_year = "Unknown";
    if (smovie.Release_Date) {
        Release_year = smovie.Release_Date.split("-")[0];
    }

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header">
                <h4 className="mb-0">
                    {smovie.Title} ({Release_year})
                </h4>
                <div className="text-muted">
                    Movie - {smovie.Original_Language !== "N/A" ? smovie.Original_Language : null}
                </div>
            </div>

            <div className="card-body container">
                <form className="row g-4" onSubmit={handleSubmit}>
                    <div className="col-12 col-md-4">
                        {smovie.Poster_Url && smovie.Poster_Url !== "N/A" ? (
                            <img
                                src={smovie.Poster_Url}
                                alt={`${smovie.Title} poster`}
                                className="img-fluid rounded"
                            />
                        ) : (
                            <div className="border rounded p-4 text-center text-muted">
                                No poster
                            </div>
                        )}
                        <input className="form-control mb-2"
                               name="Poster_Url"
                               placeholder="Poster URL"
                               value={smovie.Poster_Url}
                               onChange={handleChange}
                        />
                    </div>

                    <div className="col-12 col-md-8">
                        <h5>Description:</h5>
                        <textarea className="form-control mb-2"
                               name="Overview"
                               placeholder="Overview"
                                  rows="4"
                                  cols="50"
                               onChange={handleChange}
                        >{smovie.Overview}</textarea>

                        <h5 className="mt-3">Details:</h5>
                        <label><b>Genre:</b> <input className="form-control mb-2"
                                                    name="Genre"
                                                    placeholder="Genre"
                                                    value={smovie.Genre}
                                                    onChange={handleChange}
                        /></label>
                        <label><b>Original Language:</b> <input className="form-control mb-2"
                                                                name="Original_Language"
                                                                placeholder="Language"
                                                                value={smovie.Original_Language}
                                                                onChange={handleChange}
                        /></label>
                        <label><b>Released:</b> <input className="form-control mb-2"
                                                       name="Release_Date"
                                                       placeholder="Date (YYYY-MM-DD)"
                                                       value={smovie.Release_Date}
                                                       onChange={handleChange}
                        /></label>

                        <h5 className="mt-3">Numbers:</h5>
                        <p className="mb-2"><b>IMDB Rating: </b> {smovie.Vote_Average}</p>
                        <p className="mb-2"><b>IMDB Votes: </b> {smovie.Vote_Count}</p>
                    </div>
                    <button className="btn btn-success">Save</button>
                </form>
                <form className="row g-4 mt-1" onSubmit={handleDelete}>
                    <button className="btn btn-danger">Delete</button>
                </form>
            </div>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(SpecificMoviePage);