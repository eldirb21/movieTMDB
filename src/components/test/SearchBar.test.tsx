import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchBar from "../SearchBar";
import { fetchSearchMovies } from "../../store/slices/movieThunks";
import { clearMovies } from "../../store/slices/moviesSlice";

jest.mock("../MovieCard", () => ({ movie }: any) => (
  <div data-testid="movie-card">{movie.title}</div>
));

jest.mock("../../store/slices/movieThunks", () => ({
  fetchMoviesList: jest.fn((category, page) => ({
    type: "FETCH_MOVIES",
    payload: { category, page },
  })),
  fetchSearchMovies: jest.fn((query) => ({
    type: "FETCH_SEARCH_MOVIES",
    payload: query,
  })),
}));

const mockStore = configureStore([]);

describe("SearchBar", () => {
  let store: any;

  const initialState = {
    movieList: {
      searchQuery: "",
      movies: [],
      filter: {
        category: "popular",
        page: 1,
      },
    },
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it("renders SearchBar component", () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/search movies/i)).toBeInTheDocument();
    expect(screen.getByText(/movies/i)).toBeInTheDocument();
  });

  it("dispatches setSearched on input change", () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText(/search movies/i), {
      target: { value: "Avengers" },
    });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "movieList/setSearched",
      payload: "Avengers",
    });
  });

  it("dispatches fetchSearchMovies on form submit", () => {
    store = mockStore({
      movieList: {
        searchQuery: "Matrix",
        movies: [],
        filter: { category: "popular", page: 1 },
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(store.dispatch).toHaveBeenCalledWith(clearMovies());

    expect(store.dispatch).toHaveBeenCalledWith(fetchSearchMovies("Matrix"));
  });

  it("shows 'No movies found' if movies is empty and showResults is true", () => {
    store = mockStore({
      movieList: {
        searchQuery: "NothingHere",
        movies: [],
        filter: { category: "popular", page: 1 },
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search movies/i);
    fireEvent.change(input, {
      target: { value: "NothingHere" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
  });
});
