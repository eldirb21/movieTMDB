import React, { useState } from "react";
import { Movie } from "../types/movie";
import { searchMovies } from "../services/api";
import MovieCard from "./MovieCard";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    const res = await searchMovies(query);
    setResults(res.data.results);
    setShowResults(true);
  };

  return (
    <div className="mb-6">
      <div className="md:flex item-center place-items-start md:place-items-center pb-4 mb-2 md:justify-between border-b-2">
        <h1 className="text-3xl font-bold font-serif bg-gradient-to-r from-green-600 via-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">MOVIES</h1>
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-1/4 mt-4 md:mt-0">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full p-2 border border-gray-300 hover:border-red-300 rounded"
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Search
          </button>
        </form>
      </div>
      {showResults && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Search Results:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.length === 0 ? (
              <p className="text-gray-500">No movies found.</p>
            ) : (
              results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
