export interface MoviesHeaderProps {
  title: string;
  handleSearch: (searchedValue: string) => void;
  handleSortChange: (sortValue: "title" | "release_date" | "vote_average") => void;
}

export interface MovieCardProps {
  movieId: number;
  genre: string;
  title: string;
  year: string;
  language: string;
  poster: string;
  starsNumber: number;
  rating: number;
  isInFavorites: boolean;
  handleAddToFavorites: (movieId: number) => void;
}

export type SortValueTypes = "title" | "release_date" | "vote_average";
