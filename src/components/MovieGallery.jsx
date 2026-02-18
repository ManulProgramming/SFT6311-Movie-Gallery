import { useState, useEffect } from "react";
import { useMovies } from "../context/MovieContext";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import MovieControls from "./MovieControls";
import MovieStats from "./MovieStats";

function MovieGallery({ dark }) {
  const { movies, loading, fetchMovies } = useMovies();
  const [favorites, setFavorites] = useState(() => {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
  });
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchMovies("Fast & Furious");
        }, 100);

        return () => clearTimeout(delay);
    }, []);

  return (
    <>
      <MovieStats favoritesCount={favorites.length} />

      <MovieControls
        search={search}
        setSearch={setSearch}
        fetchMovies={fetchMovies}
      />

      <div className="row g-4 mt-2">
          {loading && (
          <div className="text-center my-3">
            <div className="spinner-border text-primary"></div>
          </div>
        )}
        {movies.length>0 ? movies.map(movie => (
          <div className="col-md-4" key={movie.imdbID}>
            <MovieCard
              movie={movie}
              isFavorite={favorites.includes(movie.imdbID)}
              toggleFavorite={toggleFavorite}
              setSelected={setSelected}
              dark={dark}
            />
          </div>
        )) : (
            <p>
                Nothing found
            </p>
        )}
      </div>

      {selected && (
        <MovieModal movie={selected} close={() => setSelected(null)} />
      )}
    </>
  );
}

export default MovieGallery;
