import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import { ReactComponent as SortIcon } from "../../assets/images/filter.svg";

import { MOVIE_DROPDOWN_SORT_ITEMS } from "../../statics/dropdownItems";
import { MoviesHeaderProps } from "./interfaces";
import Dropdown from "../Dropdown/Dropdown";

const MoviesHeader = ({ title, handleSearch, handleSortChange }: MoviesHeaderProps) => {
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
          <Dropdown
            modifierClass=" dropdown--md-wide ml--20"
            isButtonStatic={true}
            icon={<SortIcon />}
            handleChange={handleSortChange}
            dropdownItems={MOVIE_DROPDOWN_SORT_ITEMS}
          />
        </div>
      </div>
    </div>
  );
};
export default MoviesHeader;
