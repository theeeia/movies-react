export interface MovieCardProps {
  genre: string;
  title: string;
  year: string;
  language: string;
  poster: string;
  starsNumber: number;
  rating: number;
}

export interface MovieFilterDropdownProps {
  filterIcon: React.ReactNode;
  dropdownItems: any;
  handleFilterChange: (arg: number) => void;
}

export interface MovieFilterDropdownItemProps {
  label: string;
  className: string;
  value: number;
}
