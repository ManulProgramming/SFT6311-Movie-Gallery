import { useMemo } from "react";

export default function useFilter(movies, sortBy) {

  const filtered = useMemo(() => {
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

  return {filtered};
}