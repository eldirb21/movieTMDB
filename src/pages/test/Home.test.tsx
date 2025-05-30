import { render, screen, fireEvent } from "@testing-library/react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Home from "../Home";
import * as movieThunks from "../../store/slices/movieThunks";
import { clearMovies, setFilter } from "../../store/slices/moviesSlice";

jest.mock("../../hooks/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("../../components/SearchBar", () => () => (
  <div data-testid="search-bar" />
));
jest.mock("../../components/CategoryFilter", () => (props: any) => (
  <div
    data-testid="category-filter"
    onClick={() => props.onSelect("popular")}
  />
));
jest.mock("../../components/MovieList", () => () => (
  <div data-testid="movie-list" />
));

describe("Home component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it("renders components correctly", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      loading: false,
      searchQuery: "",
      filter: { category: "now_playing", page: 1 },
    });

    render(<Home />);

    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("category-filter")).toBeInTheDocument();
    expect(screen.getByTestId("movie-list")).toBeInTheDocument();
  });

  it("sets default category if not set", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      loading: false,
      searchQuery: "",
      filter: { category: "", page: 1 },
    });

    render(<Home />);

    expect(mockDispatch).toHaveBeenCalledWith(
      setFilter({ category: "now_playing", page: 1 })
    );
  });

  it("calls fetchMovies when category and page change", () => {
    const fakeThunk = jest.fn();
    const fetchMoviesListSpy = jest
      .spyOn(movieThunks, "fetchMoviesList")
      .mockReturnValue(fakeThunk);

    (useAppSelector as jest.Mock).mockReturnValue({
      loading: false,
      searchQuery: "",
      filter: { category: "top_rated", page: 2 },
    });

    render(<Home />);

    expect(mockDispatch).toHaveBeenCalledWith(clearMovies());
    expect(fetchMoviesListSpy).toHaveBeenCalledWith("top_rated", 2);
    expect(mockDispatch).toHaveBeenCalledWith(fakeThunk);
  });

  it("changes category when CategoryFilter clicked", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      loading: false,
      searchQuery: "",
      filter: { category: "now_playing", page: 1 },
    });

    render(<Home />);
    fireEvent.click(screen.getByTestId("category-filter"));

    expect(mockDispatch).toHaveBeenCalledWith(clearMovies());
    expect(mockDispatch).toHaveBeenCalledWith(
      setFilter({ category: "popular", page: 1 })
    );
  });
});
