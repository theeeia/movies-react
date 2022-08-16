import React from "react";
import { DropdownItemProps } from "../Dropdown/interfaces";

export interface MoviesHeaderProps {
  title: string;
  handleSearch: (searchedValue: string) => void;
  handleSortChange: (sortValue: "title" | "release_date" | "vote_average") => void;
}

export interface MoviesSearchBarProps {
  title: string;
  handleSearch: (searchedValue: string) => void;
  handleSearchFilter: (searchFilter: string) => void;
  handleSortChange: (sortValue: "title" | "release_date" | "vote_average") => void;
}

export interface MovieCardProps {
  favoriteIcon: React.ReactNode;
  movieId: number;
  genre: string;
  title: string;
  year: string;
  language: string;
  poster: string | undefined;
  votes: number;
  isInFavorites: boolean;
  handleAddToFavorites: (movieId: number) => void;
}

export type SortValueTypes = "title" | "release_date" | "vote_average";

export interface MovieGenresProps {
  genres: Record<string, any>;
  modifierClass?: string;
}

export interface MovieListItemProps {
  favoriteIcon: React.ReactNode;
  movieId: number;
  genres: Record<string, any>;
  title: string;
  year: string;
  language: string;
  plot: string;
  poster: string | undefined;
  votes: number;
  isInFavorites: boolean;
  handleAddToFavorites: (movieId: number) => void;
}

export interface MovieSearchInputProps {
  icon: React.ReactNode;
  modifierClass?: string;
  handleInputChange: (value: string) => void;
  handleDropdownItem: (value: DropdownItemProps) => void;
}
