function MovieControls({search, setSearch, sortBy, setSortBy, fetchMovies}) {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchMovies(search);
        }
    };

    return (
        <div className="row g-2 mt-3">
            <div className="col-md-4">
                <input
                    className="form-control"
                    placeholder="Search movie..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="col-md-4">
                <select
                    className="form-select"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="rating">Rating</option>
                    <option value="genre">Genre</option>
                </select>
            </div>
        </div>
    );
}

export default MovieControls;
