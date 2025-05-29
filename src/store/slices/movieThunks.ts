import {
  fetchMovieDetail,
  fetchMovies,
  searchMovies,
} from "../../services/api";
import { AppDispatch } from "../store";
import { setLoading, setMovieDetail, setMovies } from "./moviesSlice";

export const fetchMoviesList =
  (category: string = "now_playing", page: number = 1) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await fetchMovies(category, page);

      dispatch(setMovies(res.data.results));
    } catch (error) {
      console.error("fetchMoviesList error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchDetailMovies =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await fetchMovieDetail(id);

      dispatch(setMovieDetail(res.data));
    } catch (error) {
      console.error("fetchDetailMovies error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchSearchMovies =
  (query: string, page = 1) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await searchMovies(query, page);

      dispatch(setMovies(res.data.results));
    } catch (error) {
      console.error("fetchSearchMovies error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
