export interface MoviesHeaderProps {
  title: string;
  handleSearch: (searchedValue: string) => void;
  handleSortChange: (sortValue: "title" | "release_date" | "vote_average") => void;
}

export interface MovieCardProps {
  genre: string;
  title: string;
  year: string;
  language: string;
  poster: string;
  starsNumber: number;
  rating: number;
}

export type SortValueTypes = "title" | "release_date" | "vote_average";
