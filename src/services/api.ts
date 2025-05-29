import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchMovies = (category = "", page = 1) =>
  axios.get(`${BASE_URL}/movie/${category}`, {
    params: { api_key: API_KEY, page },
  });

export const searchMovies = (query: string, page = 1) =>
  axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query, page },
  });

export const fetchMovieDetail = (id: string) =>
  axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "credits",
    },
  });
