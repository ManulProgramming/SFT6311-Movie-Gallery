import { createContext, useCallback, useContext, useState } from "react";

const SMovieContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMovie = () => useContext(SMovieContext);

export const SMovieProvider = ({ children }) => {
    const [smovie, setSMovie] = useState(null);
    const [sloading, setSLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_API_KEY;

    const fetchMovie = useCallback(
        async (search = "tt1013752") => {
            setSLoading(true);
            try {
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(search)}`
                );
                //const res = "";
                const data = await res.json();
                console.log(data);

                if (data && data.Response !== "False") setSMovie(data);
                else setSMovie(null);
            } catch (err) {
                console.error(err);
                setSMovie(null);
            }
            setSLoading(false);
        },
        [API_KEY]
    );

    return (
        <SMovieContext.Provider value={{ smovie, sloading, fetchMovie }}>
            {children}
        </SMovieContext.Provider>
    );
};