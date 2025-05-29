import { fetchMovies } from "../../services/api";
import { AppDispatch } from "../store";
import {
  setNowPlaying,
  setPopular,
  setTopRated,
  setUpComing,
  setLoading,
} from "./moviesSlice";

export const fetchNowPlayingMovies = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await fetchMovies("now_playing");
    dispatch(setNowPlaying(res.data.results));
  } catch (error) {
    console.error("fetchNowPlayingMovies error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchPopularMovies = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await fetchMovies("popular");
    dispatch(setPopular(res.data.results));
  } catch (error) {
    console.error("fetchPopularMovies error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchTopRatedMovies = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await fetchMovies("top_rated");
    dispatch(setTopRated(res.data.results));
  } catch (error) {
    console.error("fetchTopRatedMovies error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchUpComingMovies = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await fetchMovies("upcoming");
    dispatch(setUpComing(res.data.results));
  } catch (error) {
    console.error("fetchUpComingMovies error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};
