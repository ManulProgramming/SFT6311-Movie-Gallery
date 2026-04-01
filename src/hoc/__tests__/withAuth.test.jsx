import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import withAuth from "../../hoc/withAuth";

vi.mock("../../context/MovieContext", () => ({
  useMovies: vi.fn()
}));

import { useMovies } from "../../context/MovieContext";

const TestComponent = () => {
  return <div>Protected Content</div>;
};

const Protected = withAuth(TestComponent);
describe("withAuth (authentication)", () => {
    it("shows access denied when not authenticated", () => {
        useMovies.mockReturnValue({
            isAuthenticated: false,
            setIsAuthenticated: vi.fn()
        });

        render(<Protected/>);

        expect(
            screen.getByText(/access denied/i)
        ).toBeInTheDocument();
    });

    it("renders wrapped component when authenticated", () => {
        useMovies.mockReturnValue({
            isAuthenticated: true,
            setIsAuthenticated: vi.fn()
        });

        render(<Protected/>);

        expect(
            screen.getByText("Protected Content")
        ).toBeInTheDocument();
    });

    it("restores auth state from localStorage", () => {
        const setAuthMock = vi.fn();

        localStorage.setItem("auth", "true");

        useMovies.mockReturnValue({
            isAuthenticated: false,
            setIsAuthenticated: setAuthMock
        });

        render(<Protected/>);

        expect(setAuthMock).toHaveBeenCalledWith(true);
    });
});