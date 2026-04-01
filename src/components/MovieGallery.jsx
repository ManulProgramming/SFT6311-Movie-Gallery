import {useState, useEffect} from "react";
import {useMovies} from "../context/MovieContext";
import MovieCard from "./MovieCard";
import React, { lazy, Suspense } from "react";

const MovieModal = lazy(() => import("./MovieModal"));
import MovieControls from "./MovieControls";
import MovieStats from "./MovieStats";
import AddMovieForm from "./AddMovieForm.jsx";
import useModal from "../hooks/useModal.jsx";
import FilterableMovies from "./FilterableMovies";

function MovieGallery({dark}) {
    const {movies, loading, error, fetchMovies } = useMovies();
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });
    const { selected, open, close } = useModal();
    const [search, setSearch] = useState(() => {
        const stored = localStorage.getItem("search");
        return stored ? stored : "";
    });

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
        fetchMovies(search);
    }, [search]);

    return (
        <FilterableMovies movies={movies}>
            {({ filteredMovies, sortBy, setSortBy }) => (
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

            <div className="row g-4 mt-2" data-testid="movie-list-data">
                {loading && (
                    <div className="text-center my-3">
                        <div className="spinner-border text-primary"></div>
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}
                {filteredMovies != null ? (filteredMovies.length > 0 ? filteredMovies.map(movie => (
                    <div className="col-md-4" key={movie.index}>
                        <MovieCard
                            movie={movie}
                            isFavorite={favorites.includes(movie.index)}
                            toggleFavorite={toggleFavorite}
                            open={open}
                            dark={dark}
                        >
                            <MovieCard.Header />
                            <MovieCard.Body />
                            <MovieCard.Footer />
                        </MovieCard>
                    </div>
                )) : (<></>)) : (<></>)}
            </div>

            {selected && (
                <Suspense
                    fallback={
                        <div className="modal modal-overlay show d-block">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-body text-center">
                                        <div className="spinner-border text-primary"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <MovieModal movie={selected} close={close}/>
                </Suspense>
            )}
        </>
            )}
        </FilterableMovies>
    );
}

export default MovieGallery;