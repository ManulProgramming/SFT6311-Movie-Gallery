import { createContext, useContext, useState } from "react";

const SMovieContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMovie = () => useContext(SMovieContext);

export const SMovieProvider = ({ children }) => {
    const [smovie, setSMovie] = useState(null);
    const [sloading, setSLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_API_KEY;


      const fetchMovie = async (search = "0") => {
          console.log("Test???");
    setSLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/movies?i=${encodeURIComponent(search)}`
      );
      //const res = "";
      const data = await res.json();
      console.log(data);
      if (data) {
          setSMovie(data[0]);
      } else {
        setSMovie(null);
      }
    } catch (err) {
      console.error(err);
    }
    setSLoading(false);
  };

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
                setSMovie(null);
              }
          }catch (err) {
              console.error(err);
          }
          setSLoading(false);
      }

    return (
        <SMovieContext.Provider value={{ smovie, setSMovie, sloading, fetchMovie, editMovie }}>
            {children}
        </SMovieContext.Provider>
    );
};