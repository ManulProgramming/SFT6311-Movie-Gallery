function MovieControls({ search, setSearch, fetchMovies }) {
    const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchMovies(search || "Fast & Furious");
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
    </div>
  );
}

export default MovieControls;
