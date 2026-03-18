import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch.jsx";

const MovieContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  /*const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);*/
  const {data: movies, setData: setMovies, loading, setLoading, error, setError, fetchData} = useFetch('http://127.0.0.1:8000/movies?s=');

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
        setError("Data not found!");
        setMovies([]);
      }
    }catch (err) {
      setError(err.message);
      console.error(err);
    }
    setLoading(false);
  }

  function fetchMovies(search){fetchData(search);}

  return (
    <MovieContext.Provider
      value={{ movies, loading, error, fetchMovies, addMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
};
