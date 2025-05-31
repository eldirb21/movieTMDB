import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchBar from "../SearchBar";

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
        <SearchBar setPage={jest.fn()} />
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
        <SearchBar setPage={jest.fn()} />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Search movies...");

    fireEvent.change(input, { target: { value: "NotFoundMovie" } });

    expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
  });
});
