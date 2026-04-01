import { useState } from "react";
import useFilter from "../hooks/useFilter";

function FilterableMovies({ movies, children }) {
    const [sortBy, setSortBy] = useState("");

    const { filtered } = useFilter(movies, sortBy);

    return children({
        filteredMovies: filtered,
        sortBy,
        setSortBy
    });
}

export default FilterableMovies;