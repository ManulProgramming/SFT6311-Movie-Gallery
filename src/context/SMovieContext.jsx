import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch.jsx";

const SMovieContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMovie = () => useContext(SMovieContext);

export const SMovieProvider = ({ children }) => {
    /*const [smovie, setSMovie] = useState(null);
    const [sloading, setSLoading] = useState(false);*/
    const {data: smovie, setData: setSMovie, loading: sloading, setLoading: setSLoading, error, setError, fetchData} = useFetch('http://127.0.0.1:8000/movies?i=');

    const API_KEY = import.meta.env.VITE_API_KEY;

      function fetchMovie(search="0"){fetchData(search);}
      //const fetchMovie = async (search = "0") => {fetchData(search)};

      const editMovie = async(movie) => {
          setSLoading(true);
          const requestOptions = {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(movie)
            };
          try{
              const res=await fetch(
                  `http://127.0.0.1:8000/movies`, requestOptions
              );
              const data = await res.json();
              if (data) {
                  setSMovie(data[0]);
              } else {
                  setError("Data not found!");
                setSMovie(null);
              }
          }catch (err) {
              setError(err.message);
              console.error(err);
          }
          setSLoading(false);
      }
      const deleteMovie = async(movie) => {
          setSLoading(true);
          const requestOptions = {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(movie)
            };
          try{
              const res=await fetch(
                  `http://127.0.0.1:8000/movies`, requestOptions
              );
              const data = await res.json();
              if (data) {
                  setSMovie(null);
              }
          }catch (err) {
              setError(err.message);
              console.error(err);
          }
          setSLoading(false);
      }

    return (
        <SMovieContext.Provider value={{ smovie, setSMovie, sloading, error, fetchMovie, editMovie, deleteMovie }}>
            {children}
        </SMovieContext.Provider>
    );
};