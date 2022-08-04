export interface MovieCardProps {
  genre: string;
  title: string;
  year: string;
  language: string;
  poster: string;
  starsNumber: number;
  rating: number;
}

export interface MovieSortDropdownItemProps {
  label: string;
  className: string;
  value: number;
}

export interface MovieSortDropdownProps {
  sortIcon: React.ReactNode;
  dropdownItems: any;
  handleSortChange: (arg: number) => void;
}
