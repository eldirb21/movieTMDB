import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";
import { fetchDetailMovies } from "../store/slices/movieThunks";

const URL_IMAGE = process.env.REACT_APP_URL_IMAGE;

export default function MovieDetail() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { moviesDetail, loading } = useAppSelector(
    (state: RootState) => state.movieList
  );

  useEffect(() => {
    if (id) dispatch(fetchDetailMovies(id));
  }, [id]);

  if (!moviesDetail || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-600">
          Loading movie details...
        </p>
      </div>
    );
  }

  const director = moviesDetail.credits.crew.find(
    (crewMember: any) => crewMember.job === "Director"
  );

  const cast = moviesDetail.credits.cast
    .slice(0, 3)
    .map((actor: any) => actor.name)
    .join(", ");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 transition mb-6 flex items-center"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-6 p-6">
        <img
          src={URL_IMAGE + moviesDetail.poster_path}
          alt={moviesDetail.title}
          className="w-full md:w-1/3 rounded-lg object-cover shadow-md"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {moviesDetail.title}
          </h1>

          <ul className="space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Release Date:</span>{" "}
              {moviesDetail.release_date}
            </li>
            <li>
              <span className="font-semibold">Director:</span>{" "}
              {director?.name || "Unknown"}
            </li>
            <li>
              <span className="font-semibold">Top Cast:</span> {cast || "N/A"}
            </li>
          </ul>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Overview
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {moviesDetail.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
