import { useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import { fetchMoviesList } from "../store/slices/movieThunks";
import { clearMovies, setFilter } from "../store/slices/moviesSlice";
import MovieList from "../components/MovieList";
import { RootState } from "../store/store";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    loading,
    searchQuery,
    filter: { category, page },
  } = useAppSelector((state: RootState) => state.movieList);

  useEffect(() => {
    if (!category) {
      dispatch(setFilter({ category: "now_playing", page: 1 }));
    }
  }, []);

  useEffect(() => {
    if (category && !searchQuery) {
      dispatch(clearMovies());
      fetchMovies();
    }
  }, [page, category]);

  const fetchMovies = () => dispatch(fetchMoviesList(category, page));

  const setCategories = (key: string) => {
    dispatch(clearMovies());
    dispatch(setFilter({ category: key, page: 1 }));
  };

  const setPage = (page: number) =>
    dispatch(setFilter({ category: category, page }));

  return (
    <div className="min-h-full p-8">
      <SearchBar />
      <CategoryFilter onSelect={setCategories} category={category} />
      <MovieList setPage={setPage} page={page} loading={loading} />
    </div>
  );
}
