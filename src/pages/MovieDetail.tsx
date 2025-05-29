import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetail } from "../services/api";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchMovieDetail(id).then((res) => {
        setMovie(res.data);
      });
    }
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const director = movie.credits.crew.find((c: any) => c.job === "Director");
  const cast = movie.credits.cast
    .slice(0, 3)
    .map((c: any) => c.name)
    .join(", ");

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">
        ← Back
      </button>
      <div className="flex gap-4">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="w-1/3"
        />
        <div>
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p>
            <strong>Release:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Director:</strong> {director?.name}
          </p>
          <p>
            <strong>Cast:</strong> {cast}
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}
