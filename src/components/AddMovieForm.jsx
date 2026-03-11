import {useCallback, useState} from "react";
import { useMovies } from "../context/MovieContext";

function AddMovieForm() {
  const { addMovie } = useMovies();

  const [form, setForm] = useState({
    title: "",
    date: "",
    genre: "",
    rating: "",
      poster: ""
  });

  const handleChange = useCallback((e) => {
      let regex = /^.+$/;
      let helpBlock;
      let helpBlockInnerText = "Something went wrong.";
      if (e.target.name === "date") {
          regex = /^[1-2][0189][0-9][0-9]-[0-1][0-9]-[0-3][0-9]$/;
          helpBlock = document.getElementById("dateHelpBlock");
          helpBlockInnerText = "Date needs to be in YYYY-MM-DD format.";
      }else if (e.target.name === "genre") {
          regex = /^[a-zA-Z0-9_, -]+$/;
          helpBlock = document.getElementById("genreHelpBlock");
          helpBlockInnerText = "Genre should be seperated by comma and contain only letters and digits.";
      }else if (e.target.name === "rating") {
          regex = /^[0-9]{1,2}\.?[0-9]?$/;
          helpBlock = document.getElementById("ratingHelpBlock");
          helpBlockInnerText = "Rating should be a floating number from 0 to 10 inclusively."
      }else if (e.target.name === "poster") {
          regex = /^https?:\/\/[^\s/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|webp|svg|bmp|ico)(?:\?[^\s#]*)?(?:#[^\s]*)?$/;
          helpBlock = document.getElementById("posterHelpBlock");
          helpBlockInnerText = "Poster link is not valid."
      }
      let isValid = regex.test(e.target.value);
      if (isValid) {
          e.target.classList.add('is-valid');
          e.target.classList.remove('is-invalid');
          if (helpBlock) {
              helpBlock.classList.add('text-muted');
              helpBlock.classList.remove('text-danger');
              helpBlock.innerText = "";
          }
      }else{
          e.target.classList.remove('is-valid');
          e.target.classList.add('is-invalid');
          if (helpBlock) {
              helpBlock.classList.remove('text-muted');
              helpBlock.classList.add('text-danger');
              helpBlock.innerText = helpBlockInnerText;
          }
      }
    setForm({ ...form, [e.target.name]: e.target.value });
  }, [form]);

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


        setForm({ title: "", date: "", genre: "", rating: "", poster: "" });
    }
  },[addMovie, form.date, form.genre, form.poster, form.rating, form.title]);

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