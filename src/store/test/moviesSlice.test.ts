import moviesReducer, {
  setMovies,
  setMovieDetail,
  setSearched,
  setLoading,
  setFilter,
  clearMovies,
  MoviesState,
  FILTER,
} from "../slices/moviesSlice";

describe("moviesSlice reducer", () => {
  let initialState: MoviesState;

  beforeEach(() => {
    initialState = {
      hasMore: false,
      movies: [],
      moviesDetail: null,
      searchQuery: "",
      filter: {
        category: "",
        page: 1,
      },
      loading: false,
    };
  });

  it("should return the initial state when passed an empty action", () => {
    const result = moviesReducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("should handle setMovies", () => {
    const movies = [{ id: 1, title: "Movie 1" }] as any;
    const nextState = moviesReducer(initialState, setMovies(movies));
    expect(nextState.movies).toEqual(movies);
  });

  it("should append movies when setMovies is called multiple times", () => {
    const movies1 = [{ id: 1, title: "Movie 1" }] as any;
    const movies2 = [{ id: 2, title: "Movie 2" }] as any;
    let state = moviesReducer(initialState, setMovies(movies1));
    state = moviesReducer(state, setMovies(movies2));
    expect(state.movies).toEqual([...movies1, ...movies2]);
  });

  it("should handle setMovieDetail", () => {
    const detail = { id: 1, description: "Details" } as any;
    const nextState = moviesReducer(initialState, setMovieDetail(detail));
    expect(nextState.moviesDetail).toEqual(detail);
  });

  it("should handle setSearched", () => {
    const query = "Avengers";
    const nextState = moviesReducer(initialState, setSearched(query));
    expect(nextState.searchQuery).toBe(query);
  });

  it("should handle setLoading", () => {
    const nextState = moviesReducer(initialState, setLoading(true));
    expect(nextState.loading).toBe(true);
  });

  it("should handle setFilter", () => {
    const filter: FILTER = { category: "popular", page: 3 };
    const nextState = moviesReducer(initialState, setFilter(filter));
    expect(nextState.filter).toEqual(filter);
  });

  it("should handle clearMovies", () => {
    const populatedState = {
      ...initialState,
      movies: [{ id: 1, title: "Movie 1" }] as any,
    };
    const nextState = moviesReducer(populatedState, clearMovies());
    expect(nextState.movies).toEqual([]);
  });
});
