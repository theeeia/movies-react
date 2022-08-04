import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import { ReactComponent as SortIcon } from "../../assets/images/filter.svg";

import MovieSortDropdown from "./MovieSortDropdown";

function MoviesHeader({
  title,
  handleSearch,
  handleSortChange,
}: {
  title: string;
  handleSearch: (e: any) => void;
  handleSortChange: (e: any) => void;
}) {
  const dropdownItems = [
    {
      label: "Newest",
      className: "dropdown__item",
      value: "release_date",
    },
    {
      label: "Title",

      className: "dropdown__item",
      value: "title",
    },
    {
      label: "Popular",
      className: "dropdown__item",
      value: "vote_average",
    },
  ];

  return (
    <div className="movies-header">
      <div className="movies-header__title">{title}</div>

      <div className="movies-header__search">
        <div className="movies-header__search-box">
          <SearchIcon />
          <input
            className="movies-header__input"
            placeholder="Search titles here..."
            onChange={handleSearch}
          />
        </div>
        <div className="movies-header__filter">
          <MovieSortDropdown
            sortIcon={<SortIcon />}
            handleSortChange={handleSortChange}
            dropdownItems={dropdownItems}
          />
        </div>
      </div>
    </div>
  );
}
export default MoviesHeader;
