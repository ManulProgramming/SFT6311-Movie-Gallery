import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import AddMovieForm from "../AddMovieForm"
import {MovieProvider} from "../../context/MovieContext.jsx";
import {SMovieProvider} from "../../context/SMovieContext.jsx";

describe("AddMovieForm", () => {

  it("renders title input", () => {

    render(<MovieProvider><SMovieProvider><AddMovieForm /></SMovieProvider></MovieProvider>)

    const input = screen.getByPlaceholderText("Title")

    expect(input).toBeInTheDocument()
  })

})