import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const addMovie = async (movie) => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    };
    try{
      const res = await fetch(
          `http://127.0.0.1:8000/movies`, requestOptions
      );
      const data = await res.json();
      if (data) {
        setMovies(data);
      } else {
        setMovies([]);
      }
    }catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  const fetchMovies = async (search) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/movies?s=${encodeURIComponent(search)}`
      );
      //const res=""
      const data = await res.json();
      if (data) {
        setMovies(data);
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
      value={{ movies, loading, fetchMovies, addMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
};
