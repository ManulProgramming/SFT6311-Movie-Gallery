import {useMemo, useState, useEffect} from "react";
import {useMovies} from "../context/MovieContext";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import MovieControls from "./MovieControls";
import MovieStats from "./MovieStats";
import AddMovieForm from "./AddMovieForm.jsx";

function MovieGallery({dark}) {
    const {movies, loading, fetchMovies } = useMovies();
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState(() => {
        const stored = localStorage.getItem("search");
        return stored ? stored : "";
    });
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem("search", search);
    }, [search]);

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(f => f !== id)
                : [...prev, id]
        );
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchMovies(search);
        }, 100);

        return () => clearTimeout(delay);
    }, []);
    const filteredMovies = useMemo(() => {
        let result = movies;

        if (sortBy === "rating") {
            result = [...result].sort(
                (a, b) => (b.Vote_Average || 0) - (a.Vote_Average || 0)
            );
        }

        if (sortBy === "genre") {
            result = [...result].sort(
                (a, b) => (a.Genre || "").localeCompare(b.Genre || "")
            );
        }

        return result;
    }, [movies, sortBy]);

    return (
        <>
            <MovieStats favoritesCount={favorites.length}/>

            <MovieControls
                search={search}
                setSearch={setSearch}
                sortBy={sortBy}
                setSortBy={setSortBy}
                fetchMovies={fetchMovies}
            />

            <AddMovieForm />

            <div className="row g-4 mt-2">
                {loading && (
                    <div className="text-center my-3">
                        <div className="spinner-border text-primary"></div>
                    </div>
                )}
                {filteredMovies.length > 0 ? filteredMovies.map(movie => (
                    <div className="col-md-4" key={movie.index}>
                        <MovieCard
                            movie={movie}
                            isFavorite={favorites.includes(movie.index)}
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
                <MovieModal movie={selected} close={() => setSelected(null)}/>
            )}
        </>
    );
}

export default MovieGallery;
