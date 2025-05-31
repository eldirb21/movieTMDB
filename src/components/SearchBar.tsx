import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { clearMovies, setSearched } from "../store/slices/moviesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";
import { fetchSearchMovies } from "../store/slices/movieThunks";

interface SearchProps {
  setPage: (page: number) => void;
}

export default function SearchBar({ setPage }: SearchProps) {
  const dispatch = useAppDispatch();
  const { searchQuery, movies } = useAppSelector(
    (state: RootState) => state.movieList
  );

  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!searchQuery) return;
    dispatch(fetchSearchMovies(searchQuery));
    setShowResults(true);
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(setSearched(e.target.value));
    dispatch(clearMovies());

    if (!e.target.value) {
      setPage(1);
      setShowResults(false);
    } else {
      handleSearch();
    }
  };

  return (
    <div className="mb-6">
      <div className="md:flex item-center place-items-start md:place-items-center pb-4 mb-2 md:justify-between border-b-2">
        <h1 className="text-3xl font-bold font-serif bg-gradient-to-r from-green-600 via-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          MOVIES
        </h1>
        <form className="flex gap-2 w-full md:w-1/4 mt-4 md:mt-0">
          <input
            type="text"
            value={searchQuery}
            onChange={onChangeSearch}
            placeholder="Search movies..."
            className="w-full p-2 border border-gray-300 hover:border-red-300 rounded"
          />
        </form>
      </div>
      {showResults && (
        <div>
          <h2 className="text-xl font-normal mb-2 text-gray-600">
            Search Results: <em>{searchQuery}</em>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.length === 0 ? (
              <p className="text-gray-500">No movies found.</p>
            ) : (
              movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
