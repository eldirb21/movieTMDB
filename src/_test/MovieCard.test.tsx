import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "../components/MovieCard";

test("renders movie title", () => {
  const movie = {
    id: 1,
    title: "Test Movie",
    release_date: "2023-01-01",
    poster_path: "/test.jpg",
    overview: "",
    vote_average: 0,
    genre_ids: [1],
    original_language: "",
    original_title: "",
    popularity: 2,
  };
  const { getByText } = render(
    <MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>
  );
  expect(getByText("Test Movie")).toBeInTheDocument();
});
