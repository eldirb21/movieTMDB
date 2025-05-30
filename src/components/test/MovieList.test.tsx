import { render, screen, act } from "@testing-library/react";
import MovieList from "../MovieList";
import * as hooks from "../../hooks/hooks";
import { Movie } from "../../types/movie";

jest.mock("../MovieCard", () => ({ movie }: { movie: any }) => (
  <div data-testid="movie-card">{movie.title}</div>
));

describe("MovieList", () => {
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

  let setPageMock: jest.Mock;

  beforeEach(() => {
    setPageMock = jest.fn();
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders movies from redux state", () => {
    render(<MovieList page={1} setPage={setPageMock} loading={false} />);
    const movieCards = screen.getAllByTestId("movie-card");
    expect(movieCards.length).toBe(moviesMock.length);
    expect(movieCards[0]).toHaveTextContent("Inception");
    expect(movieCards[1]).toHaveTextContent("Interstellar");
  });

  it("calls setPage when loader div is intersecting and loading is false", () => {
    jest.useFakeTimers();
    render(<MovieList page={1} setPage={setPageMock} loading={false} />);

    const callback = (window as any).intersectionObserverCallback;

    act(() => {
      callback([{ isIntersecting: true }]);
    });

    expect(setPageMock).toHaveBeenCalledWith(2);

    jest.useRealTimers();
  });

  it("does not call setPage when loading is true", () => {
    jest.useFakeTimers();
    render(<MovieList page={1} setPage={setPageMock} loading={true} />);

    const callback = (window as any).intersectionObserverCallback;

    act(() => {
      callback([{ isIntersecting: true }]);
    });

    expect(setPageMock).not.toHaveBeenCalled();

    jest.useRealTimers();
  });

  it("shows loading text when loading is true", () => {
    render(<MovieList page={1} setPage={setPageMock} loading={true} />);
    expect(screen.getByText(/Loading more/i)).toBeInTheDocument();
  });

  it("does not show loading text when loading is false", () => {
    render(<MovieList page={1} setPage={setPageMock} loading={false} />);
    expect(screen.queryByText(/Loading more/i)).not.toBeInTheDocument();
  });
});

beforeAll(() => {
  let callbackRef: IntersectionObserverCallback;

  class IntersectionObserverMock {
    constructor(callback: IntersectionObserverCallback) {
      callbackRef = callback;
    }
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  }

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
  });

  Object.defineProperty(window, "intersectionObserverCallback", {
    get() {
      return callbackRef;
    },
  });
});
