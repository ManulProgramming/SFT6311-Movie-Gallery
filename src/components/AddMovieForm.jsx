import {useCallback} from "react";
import { useMovies } from "../context/MovieContext";
import useForm from "../hooks/useForm";

function AddMovieForm() {
  const { addMovie } = useMovies();

  const { form, handleChange, reset } = useForm({
      title: "",
      date: "",
      genre: "",
      rating: "",
      poster: ""
    });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!form.title || !form.rating) return;
    if (/^[1-2][0189][0-9][0-9]-[0-1][0-9]-[0-3][0-9]$/.test(form.date) && /^[a-zA-Z0-9_, -]+$/.test(form.genre) && /^[0-9]{1,2}\.?[0-9]?$/.test(form.rating)
    && /^https?:\/\/[^\s/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|webp|svg|bmp|ico)(?:\?[^\s#]*)?(?:#[^\s]*)?$/.test(form.poster)) {
        addMovie({
            Release_Date: form.date,
            Title: form.title,
            Overview: "N/A",
            Popularity: 0,
            Vote_Count: 1,
            Vote_Average: form.rating,
            Original_Language: "N/A",
            Genre: form.genre,
            Poster_Url: form.poster
        });


        reset();
    }
  },[addMovie, form.date, form.genre, form.poster, form.rating, form.title, reset]);

  return (
      <form className="card p-3 my-4" onSubmit={handleSubmit}>
          <h5>Add Movie</h5>

          <input className="form-control mb-2"
                 name="title"
                 placeholder="Title"
                 value={form.title}
                 onChange={handleChange}
          />

          <input className="form-control mb-2"
                 name="date"
                 placeholder="Date (YYYY-MM-DD)"
                 value={form.date}
                 onChange={handleChange}
          />
          <div id="dateHelpBlock" className="form-text">

          </div>

          <input className="form-control mb-2"
                 name="genre"
                 placeholder="Genre"
                 value={form.genre}
                 onChange={handleChange}
          />
          <div id="genreHelpBlock" className="form-text">

          </div>

          <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              className="form-control mb-2"
              name="rating"
              placeholder="Rating (0-10)"
              value={form.rating}
              onChange={handleChange}
          />
          <div id="ratingHelpBlock" className="form-text">

          </div>

          <input className="form-control mb-2"
                 name="poster"
                 placeholder="Poster URL"
                 value={form.poster}
                 onChange={handleChange}
          />
          <div id="posterHelpBlock" className="form-text">

          </div>

          <button className="btn btn-success">Add</button>
      </form>
  );
}

export default AddMovieForm;