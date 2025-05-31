import React, { useRef, useEffect, useCallback } from "react";
import MovieCard from "./MovieCard";
import { RootState } from "../store/store";
import { useAppSelector } from "../hooks/hooks";

interface MovieListProps {
  page: number;
  setPage: (page: number) => void;
  loading: boolean;
}

function MovieList({ page, setPage, loading }: MovieListProps) {
  const loader = useRef<HTMLDivElement | null>(null);
  const { movies, searchQuery } = useAppSelector((state: RootState) => state.movieList);

  const loadMore = useCallback(() => {
    if (!loading) {
      setPage(page + 1);
    }
  }, [loading, page, setPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loadMore]);

  if(searchQuery) return null

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>

      <div ref={loader} style={{ height: 1 }} />
      {loading && <p className="text-center mt-4">Loading more...</p>}
    </>
  );
}

export default React.memo(MovieList);
