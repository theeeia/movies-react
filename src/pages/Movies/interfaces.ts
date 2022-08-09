export interface MovieApiProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GenreApiProps {
  id: number;
  name: string;
}

export interface MovieContentProps {
  title: string;
  apiKey: string;
}

export interface MovieDetailsApiProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Record<string, any>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Record<string, any>;
  production_countries: Record<string, any>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Record<string, any>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
