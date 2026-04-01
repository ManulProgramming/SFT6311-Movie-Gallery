import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import FilterableMovies from "../FilterableMovies";

describe("FilterableMovies (Render Props)", () => {
  it("calls render function with correct parameters", () => {
    const movies = [{ Title: "A", Vote_Average: 5 }];

    const renderFn = vi.fn(() => null);

    render(
      <FilterableMovies movies={movies}>
        {renderFn}
      </FilterableMovies>
    );

    expect(renderFn).toHaveBeenCalled();

    const args = renderFn.mock.calls[0][0];

    expect(args).toHaveProperty("filteredMovies");
    expect(args).toHaveProperty("sortBy");
    expect(args).toHaveProperty("setSortBy");

    expect(args.filteredMovies).toEqual(movies);
  });
  it("updates filteredMovies when sortBy changes", () => {
    const movies = [
      { Title: "A", Vote_Average: 5 },
      { Title: "B", Vote_Average: 9 }
    ];

    const { getByText, getAllByTestId } = render(
      <FilterableMovies movies={movies}>
        {({ filteredMovies, setSortBy }) => (
          <div>
            <button onClick={() => setSortBy("rating")}>Sort</button>
            {filteredMovies.map((m) => (
              <div key={m.Title} data-testid="movie">
                {m.Vote_Average}
              </div>
            ))}
          </div>
        )}
      </FilterableMovies>
    );

    let items = getAllByTestId("movie");
    expect(items[0].textContent).toBe("5");

    fireEvent.click(getByText("Sort"));

    items = getAllByTestId("movie");
    expect(items[0].textContent).toBe("9");
  });

  it("renders UI based on filteredMovies", () => {
    const movies = [
      { Title: "A", Vote_Average: 5 },
      { Title: "B", Vote_Average: 9 }
    ];

    const { getByText } = render(
      <FilterableMovies movies={movies}>
        {({ filteredMovies, setSortBy }) => (
          <div>
            <button onClick={() => setSortBy("rating")}>Sort</button>
            {filteredMovies.map((m) => (
              <span key={m.Title}>{m.Title}</span>
            ))}
          </div>
        )}
      </FilterableMovies>
    );

    fireEvent.click(getByText("Sort"));

    const elements = document.querySelectorAll("span");

    expect(elements[0].textContent).toBe("B");
  });
});