import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {MovieProvider} from "../../context/MovieContext.jsx";
import {SMovieProvider} from "../../context/SMovieContext.jsx";
import MovieGallery from "../MovieGallery.jsx";

describe("MovieGallery", () => {

  it("renders movie data", () => {

    render(<MovieProvider><SMovieProvider><MovieGallery dark={true} /></SMovieProvider></MovieProvider>)

    const input = screen.getByTestId('movie-list-data');

    expect(input).toBeInTheDocument()
  })

})