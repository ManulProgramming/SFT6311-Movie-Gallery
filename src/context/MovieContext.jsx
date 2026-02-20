import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchMovies = async (search = "Fast & Furious") => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(search)}`
      );
      //const res=""
      const data = await res.json();
      console.log(data);
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <MovieContext.Provider
      value={{ movies, loading, fetchMovies }}
    >
      {children}
    </MovieContext.Provider>
  );
};
