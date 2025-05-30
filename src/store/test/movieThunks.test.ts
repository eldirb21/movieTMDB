import { store } from "../store";
import * as api from "../../services/api";
import {
  fetchDetailMovies,
  fetchMoviesList,
  fetchSearchMovies,
} from "../slices/movieThunks";
import { Movie, MovieDetailData } from "../../types/movie";

describe("moviesThunk actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockMovie: Movie = {
    id: 1,
    title: "Test Movie",
    overview: "Overview",
    release_date: "2025-01-01",
    poster_path: "/path.jpg",
    vote_average: 8,
    genre_ids: [1],
    original_language: "en",
    original_title: "Original Title",
    popularity: 10,
  };

  const mockMovieDetail: MovieDetailData = {
    ...mockMovie,
    runtime: 120,
    genres: [
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
    ],
    status: "Released",
    tagline: "The test tagline",
    credits: {
      cast: [
        {
          id: 100,
          name: "Test Actor",
          character: "Hero",
          profile_path: "/actor-profile.jpg",
        },
      ],
      crew: [
        {
          id: 200,
          name: "Test Director",
          job: "Director",
          department: "Directing",
          profile_path: null,
        },
      ],
    },
  };

  it("fetchMoviesList dispatches actions and updates state", async () => {
    jest.spyOn(api, "fetchMovies").mockResolvedValue({
      data: {
        results: [mockMovie],
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        headers: {} as any,
      },
    });

    await store.dispatch(fetchMoviesList("popular", 1));

    const state = store.getState().movieList;

    expect(state.loading).toBe(false);
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0].title).toBe("Test Movie");
  });

  it("fetchDetailMovies dispatches actions correctly", async () => {
    jest.spyOn(api, "fetchMovieDetail").mockResolvedValue({
      data: mockMovieDetail,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        headers: {} as any,
      },
    });

    await store.dispatch(fetchDetailMovies("1"));

    const state = store.getState().movieList;

    expect(state.loading).toBe(false);
    expect(state.moviesDetail).toBe(mockMovieDetail);
    expect(state.moviesDetail?.title).toBe("Test Movie");
  });

  it("fetchSearchMovies dispatches actions and updates state", async () => {
    jest.spyOn(api, "searchMovies").mockResolvedValue({
      data: {
        results: [mockMovie],
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        headers: {},
      },
    });

    await store.dispatch(fetchSearchMovies("joko", 1));

    const state = store.getState().movieList;

    expect(state.loading).toBe(false);
    expect(state.movies).toHaveLength(2);
    expect(state.movies[0].title).toBe("Test Movie");
  });
});
