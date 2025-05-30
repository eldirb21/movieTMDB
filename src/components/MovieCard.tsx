import { Link } from "react-router";
import { Movie } from "../types/movie";

const URL_IMAGE = process.env.REACT_APP_URL_IMAGE;

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-white shadow rounded p-2">
        <img src={URL_IMAGE + movie.poster_path} alt={movie.title} />
        <h2 className="text-lg font-bold">{movie.title}</h2>
        <p>{new Date(movie.release_date).getFullYear()}</p>
      </div>
    </Link>
  );
}
