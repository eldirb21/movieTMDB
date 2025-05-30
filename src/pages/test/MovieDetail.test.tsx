import { render, screen } from "@testing-library/react";
import { useParams, useNavigate } from "react-router";
import MovieDetail from "../MovieDetail";
import * as hooks from "../../hooks/hooks";
import * as movieThunks from "../../store/slices/movieThunks";
import { Movie } from "../../types/movie";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("../../store/slices/movieThunks", () => ({
  fetchDetailMovies: jest.fn((id: string) => (dispatch: any) => {
    dispatch({ type: "FETCH_DETAIL_MOVIES", payload: id });
  }),
}));

describe("MovieDetail", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  const moviesMock: Movie[] = [
    {
      id: 1,
      title: "Inception",
      overview: "A thief who steals corporate secrets ...",
      release_date: "2010-07-16",
      poster_path: "/poster1.jpg",
      backdrop_path: "/backdrop1.jpg",
      vote_average: 8.8,
      genre_ids: [28, 12, 878],
      original_language: "en",
      original_title: "Inception",
      popularity: 150.5,
    },
    {
      id: 2,
      title: "Interstellar",
      overview: "A team of explorers travel ...",
      release_date: "2014-11-07",
      poster_path: "/poster2.jpg",
      vote_average: 8.6,
      genre_ids: [12, 18, 878],
      original_language: "en",
      original_title: "Interstellar",
      popularity: 130.3,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(hooks, "useAppDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(hooks, "useAppSelector").mockImplementation((selector) =>
      selector({
        movieList: {
          movies: moviesMock,
          moviesDetail: {
            id: 1,
            title: "Inception",
            overview: "A thief who steals corporate secrets ...",
            release_date: "2010-07-16",
            poster_path: "/poster1.jpg",
            backdrop_path: "/backdrop1.jpg",
            vote_average: 8.8,
            genre_ids: [28, 12, 878],
            original_language: "en",
            original_title: "Inception",
            popularity: 150.5,
            runtime: 2,
            status: "oke",
            tagline: "#tag",
            genres: [{ id: 1, name: "sample" }],
            credits: {
              crew: [
                {
                  id: 1,
                  name: "test",
                  profile_path: "image.png",
                  job: "sample",
                  department: "sample",
                },
              ],
              cast: [
                {
                  id: 1,
                  name: "Joe",
                  character: "sample",
                  profile_path: "image.png",
                },
              ],
            },
          },
          searchQuery: "",
          filter: { category: "", page: 1 },
          loading: false,
        },
      })
    );

    (useParams as jest.Mock).mockReturnValue({ id: "123" });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("dispatches fetchDetailMovies on mount with id", () => {
    render(<MovieDetail />);

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

    expect(movieThunks.fetchDetailMovies).toHaveBeenCalledWith("123");
  });

  it("renders movie details when loaded", () => {
    render(<MovieDetail />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010-07-16")).toBeInTheDocument();

    expect(screen.getByText(/Director:/)).toBeInTheDocument();
    expect(screen.getByText(/Top Cast:/)).toBeInTheDocument();
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(
      screen.getByText("A thief who steals corporate secrets ...")
    ).toBeInTheDocument();
  });

  it("shows loading text when loading is true", () => {
    jest.spyOn(hooks, "useAppSelector").mockImplementation((selector) =>
      selector({
        movieList: {
          movies: moviesMock,
          moviesDetail: null,
          searchQuery: "",
          filter: { category: "", page: 1 },
          loading: false,
        },
      })
    );

    render(<MovieDetail />);
    expect(screen.getByText(/Loading movie details/i)).toBeInTheDocument();
  });
});
