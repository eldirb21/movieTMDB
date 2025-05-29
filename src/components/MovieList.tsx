import { useEffect, useState, useRef, useCallback } from "react";
import { Movie } from "../types/movie";
import { fetchMovies } from "../services/api";
import MovieCard from "./MovieCard";

export default function MovieList({ category }: { category: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    fetchMovies(category, page).then((res) => {
      setMovies((prev) => [...prev, ...res.data.results]);
    });
  }, [category, page]);

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    });

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.disconnect();
    };
  }, [loadMore]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>
      <div ref={loader} className="h-10" />
    </>
  );
}
