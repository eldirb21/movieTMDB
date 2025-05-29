import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieDetail } from "../../types/movie";

export interface FILTER {
  category: string;
  page: number;
}
export interface MoviesState {
  movies: Movie[];
  moviesDetail: MovieDetail | null;
  searchQuery: string;
  filter: FILTER;
  loading: boolean;
}

const initialState: MoviesState = {
  movies: [],
  moviesDetail: null,
  searchQuery: "",
  filter: {
    category: "",
    page: 1,
  },
  loading: false,
};

const moviesSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = [...state.movies, ...action.payload];
    },
    setMovieDetail(state, action: PayloadAction<MovieDetail>) {
      state.moviesDetail = action.payload;
    },
    setSearched(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setFilter(state, action: PayloadAction<FILTER>) {
      state.filter.category = action.payload.category;
      state.filter.page = action.payload.page;
    },
    clearMovies(state) {
      state.movies = [];
    },
  },
});

export const {
  setMovies,
  setLoading,
  setMovieDetail,
  setSearched,
  clearMovies,
  setFilter,
} = moviesSlice.actions;

export default moviesSlice.reducer;
