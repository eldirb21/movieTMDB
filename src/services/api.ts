import axios from "axios";

const API_KEY = "969025cbf23551ca12b9e12950987578"; // ganti dengan API key asli
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = (category = "popular", page = 1) =>
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
