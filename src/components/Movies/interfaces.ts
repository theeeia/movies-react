export interface MoviesHeaderProps {
  title: string;
  handleSearch: (e: any) => void;
  handleSortChange: (e: any) => void;
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
