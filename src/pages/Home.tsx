import MovieList from "../components/MovieList";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpComingMovies,
} from "../store/slices/movieThunks";
import { RootState } from "../store/store";

export default function Home() {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("popular");
  const { movies, loading } = useAppSelector(
    (state: RootState) => state.movieList
  );

  const { popular, list, nowPlaying, topRated, upComing } = movies;

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpComingMovies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-full p-8">
      <SearchBar />
      <CategoryFilter onSelect={setCategory} />
      <MovieList category={category} />
    </div>
  );
}
