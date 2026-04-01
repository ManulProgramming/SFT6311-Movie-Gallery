import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddMovieForm from "../AddMovieForm";

vi.mock("../../context/MovieContext", () => ({
  useMovies: vi.fn()
}));

import { useMovies } from "../../context/MovieContext";

describe("AddMovieForm (Hybrid)", () => {
    it("updates controlled inputs (title, rating)", () => {
        useMovies.mockReturnValue({addMovie: vi.fn()});

        render(<AddMovieForm/>);

        const titleInput = screen.getByPlaceholderText("Title");
        const ratingInput = screen.getByPlaceholderText("Rating (0-10)");

        fireEvent.change(titleInput, {target: {value: "Batman"}});
        fireEvent.change(ratingInput, {target: {value: "8"}});

        expect(titleInput.value).toBe("Batman");
        expect(ratingInput.value).toBe("8");
    });
    it("submits valid form and calls addMovie", () => {
        const addMovieMock = vi.fn();

        useMovies.mockReturnValue({addMovie: addMovieMock});

        render(<AddMovieForm/>);

        fireEvent.change(screen.getByPlaceholderText("Title"), {
            target: {value: "Batman"}
        });

        fireEvent.change(screen.getByPlaceholderText("Rating (0-10)"), {
            target: {value: "8"}
        });

        fireEvent.change(screen.getByPlaceholderText("Date (YYYY-MM-DD)"), {
            target: {value: "2020-10-10"}
        });

        fireEvent.change(screen.getByPlaceholderText("Genre"), {
            target: {value: "Action"}
        });

        fireEvent.change(screen.getByPlaceholderText("Poster URL"), {
            target: {value: "https://test.com/image.jpg"}
        });

        fireEvent.click(screen.getByText("Add"));

        expect(addMovieMock).toHaveBeenCalled();

        const callArg = addMovieMock.mock.calls[0][0];

        expect(callArg.Title).toBe("Batman");
        expect(callArg.Vote_Average).toBe("8");
    });
    it("does not submit with invalid data", () => {
        const addMovieMock = vi.fn();

        useMovies.mockReturnValue({addMovie: addMovieMock});

        render(<AddMovieForm/>);

        fireEvent.click(screen.getByText("Add"));

        expect(addMovieMock).not.toHaveBeenCalled();
    });
    it("resets form after successful submission", () => {
        const addMovieMock = vi.fn();

        useMovies.mockReturnValue({addMovie: addMovieMock});

        render(<AddMovieForm/>);

        const titleInput = screen.getByPlaceholderText("Title");
        const ratingInput = screen.getByPlaceholderText("Rating (0-10)");
        const dateInput = screen.getByPlaceholderText("Date (YYYY-MM-DD)");

        fireEvent.change(titleInput, {
            target: {value: "Batman"}
        });

        fireEvent.change(ratingInput, {
            target: {value: "8"}
        });

        fireEvent.change(dateInput, {
            target: {value: "2020-10-10"}
        });

        fireEvent.change(screen.getByPlaceholderText("Genre"), {
            target: {value: "Action"}
        });

        fireEvent.change(screen.getByPlaceholderText("Poster URL"), {
            target: {value: "https://test.com/image.jpg"}
        });

        fireEvent.click(screen.getByText("Add"));

        expect(titleInput.value).toBe("");
        expect(ratingInput.value).toBe("");

        expect(dateInput.value).toBe("");
    });
});