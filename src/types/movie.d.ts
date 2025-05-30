export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
}
export interface MovieDetailData extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  status: string;
  tagline: string;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export type CategoryFilterProps = {
  onSelect: (category: string) => void;
  category: string;
};
export type MovieListProps = {
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
};
