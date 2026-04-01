import {render, screen} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";
import {MemoryRouter} from "react-router-dom";
import MovieCard from "../MovieCard";

const mockMovie = {
    index: 1,
    Title: "Test Movie",
    Poster_Url: "test.jpg"
};

describe("MovieCard (Compound Components)", () => {
    it("renders movie title and image", () => {
        render(
            <MemoryRouter>
                <MovieCard
                    movie={mockMovie}
                    isFavorite={false}
                    toggleFavorite={vi.fn()}
                    open={vi.fn()}
                    dark={false}
                >
                    <MovieCard.Header/>
                    <MovieCard.Body/>
                    <MovieCard.Footer/>
                </MovieCard>
            </MemoryRouter>
        );

        expect(screen.getByText("Test Movie")).toBeInTheDocument();
        expect(screen.getByAltText("Test Movie poster")).toBeInTheDocument();
    });
    it("calls toggleFavorite when button clicked", () => {
        const toggleMock = vi.fn();

        render(
            <MemoryRouter>
                <MovieCard
                    movie={mockMovie}
                    isFavorite={false}
                    toggleFavorite={toggleMock}
                    open={vi.fn()}
                    dark={false}
                >
                    <MovieCard.Footer/>
                </MovieCard>
            </MemoryRouter>
        );

        screen.getByText("Favorite").click();

        expect(toggleMock).toHaveBeenCalledWith(1);
    });
    it("calls open when Details clicked", () => {
        const openMock = vi.fn();

        render(
            <MemoryRouter>
                <MovieCard
                    movie={mockMovie}
                    isFavorite={false}
                    toggleFavorite={vi.fn()}
                    open={openMock}
                    dark={false}
                >
                    <MovieCard.Footer/>
                </MovieCard>
            </MemoryRouter>
        );

        screen.getByText("Details").click();

        expect(openMock).toHaveBeenCalledWith(mockMovie);
    });
    it("shares context between children components", () => {
      render(
        <MemoryRouter>
          <MovieCard
            movie={mockMovie}
            isFavorite={true}
            toggleFavorite={vi.fn()}
            open={vi.fn()}
            dark={false}
          >
            <MovieCard.Body />
            <MovieCard.Footer />
          </MovieCard>
        </MemoryRouter>
      );

      expect(screen.getByText("Remove")).toBeInTheDocument();
    });
});