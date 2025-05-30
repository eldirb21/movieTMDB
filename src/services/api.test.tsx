import axios from "axios";

import { fetchMovieDetail, fetchMovies, searchMovies } from "./api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Movie API functions", () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetchMovies should call correct endpoint with params", async () => {
    const category = "popular";
    const page = 2;
    const mockData = { results: [] };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const response = await fetchMovies(category, page);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/movie/${category}`,
      {
        params: { api_key: API_KEY, page },
      }
    );
    expect(response.data).toEqual(mockData);
  });

  it("searchMovies should call correct endpoint with params", async () => {
    const query = "batman";
    const page = 1;
    const mockData = { results: [] };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const response = await searchMovies(query, page);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query, page },
    });
    expect(response.data).toEqual(mockData);
  });

  it("fetchMovieDetail should call correct endpoint with params", async () => {
    const id = "123";
    const mockData = { title: "Sample Movie", credits: {} };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const response = await fetchMovieDetail(id);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY, append_to_response: "credits" },
    });
    expect(response.data).toEqual(mockData);
  });
});
