import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// eslint-disable-next-line no-undef
global.fetch = vi.fn((url) => {
        if (url.includes("movies?s=")) {
            return Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve([
                        {
                            index: 1,
                            Title: "Batman",
                            Poster_Url: "https://example.com/test.jpg",
                            Vote_Average: 8,
                            Genre: "Action"
                        }
                    ])
            });
        }

        if (url.includes("movies?i=")) {
            return Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        Overview: "Test overview",
                        Genre: "Action",
                        Vote_Average: 8
                    })
            });
        }

        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({})
        });
    });

describe("App (Full integration test)", () => {
    it("adds a new movie", async () => {
        await act(async () => {
          render(
            <MemoryRouter>
              <App />
            </MemoryRouter>
          );
        });

        fireEvent.change(screen.getByPlaceholderText("Title"), {
            target: {value: "New Movie"}
        });

        fireEvent.change(screen.getByPlaceholderText("Rating (0-10)"), {
            target: {value: "7"}
        });

        fireEvent.change(screen.getByPlaceholderText("Date (YYYY-MM-DD)"), {
            target: {value: "2020-10-10"}
        });

        fireEvent.change(screen.getByPlaceholderText("Genre"), {
            target: {value: "Drama"}
        });

        fireEvent.change(screen.getByPlaceholderText("Poster URL"), {
            target: {value: "https://test.com/image.jpg"}
        });

        fireEvent.click(screen.getByText("Add"));

        expect(screen.getByPlaceholderText("Title").value).toBe("");
    });

    it("navigates to profile page", async () => {
        await act(async () => {
          render(
            <MemoryRouter>
              <App />
            </MemoryRouter>
          );
        });

        expect(screen.getByText(/profile/i)).toBeInTheDocument();
    });
});