import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";

import MovieFilterDropdown from "./MovieFilterDropdown";

function MoviesHeader({
  title,
  handleSearch,
  handleFilterChange,
}: {
  title: string;
  handleSearch: (e: any) => void;
  handleFilterChange: (e: any) => void;
}) {
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
          <MovieFilterDropdown handleFilterChange={handleFilterChange} />
        </div>
      </div>
    </div>
  );
}
export default MoviesHeader;
