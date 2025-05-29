import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  id: number;
  title: string;
  // ...other fields
}

export interface MoviesState {
  movies: {
    list: Movie[];
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upComing: Movie[];
  };
  loading: boolean;
}

const initialState: MoviesState = {
  movies: {
    list: [],
    nowPlaying: [],
    popular: [],
    topRated: [],
    upComing: [],
  },
  loading: false,
};

const moviesSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies.list = action.payload;
    },
    setNowPlaying(state, action: PayloadAction<Movie[]>) {
      state.movies.nowPlaying = action.payload;
    },
    setPopular(state, action: PayloadAction<Movie[]>) {
      state.movies.popular = action.payload;
    },
    setTopRated(state, action: PayloadAction<Movie[]>) {
      state.movies.topRated = action.payload;
    },
    setUpComing(state, action: PayloadAction<Movie[]>) {
      state.movies.upComing = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setMovies,
  setNowPlaying,
  setPopular,
  setTopRated,
  setUpComing,
  setLoading,
} = moviesSlice.actions;

export default moviesSlice.reducer;
