import React from "react";
import { render, screen } from "@testing-library/react";
import { Movie } from "../../types/movie";
import MovieCard from "../MovieCard";

jest.mock("react-router", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

const movie: Movie = {
  id: 123,
  title: "The Matrix",
  overview: "A computer hacker learns about the true nature of reality.",
  release_date: "1999-03-31",
  poster_path: "/matrix.jpg",
  backdrop_path: "/matrix_backdrop.jpg",
  vote_average: 8.7,
  genre_ids: [28, 878],
  original_language: "en",
  original_title: "The Matrix",
  popularity: 30.5,
};

describe("MovieCard", () => {
  test("renders correctly with movie data", () => {
    render(<MovieCard movie={movie} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/movie/${movie.id}`);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      process.env.REACT_APP_URL_IMAGE + movie.poster_path
    );
    expect(img).toHaveAttribute("alt", movie.title);

    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByText("1999")).toBeInTheDocument();
  });
});
