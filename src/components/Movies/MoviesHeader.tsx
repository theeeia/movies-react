import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/images/filter.svg";

function MoviesHeader({ title }: { title: string }) {
  return (
    <div className="movies-header">
      <div className="movies-header__title">{title}</div>

      <div className="movies-header__search">
        <div className="movies-header__search-box">
          <SearchIcon />
          <input className="movies-header__input" placeholder="Search titles here..." />
        </div>
        <div className="movies-header__filter">
          <FilterIcon /> Newest
        </div>
      </div>
    </div>
  );
}
export default MoviesHeader;
