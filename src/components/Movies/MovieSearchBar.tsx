// Icons
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import { ReactComponent as SortIcon } from "../../assets/images/filter.svg";

// Interfaces
import { MoviesSearchBarProps, SortValueTypes } from "./interfaces";
import { DropdownItemProps } from "../Dropdown/interfaces";

// Statics
import { MOVIES_DROPDOWN_SORT_ITEMS } from "../../pages/Movies/statics";

// Components
import Dropdown from "../Dropdown/Dropdown";

// Icons

import MovieSearchInput from "./MovieSearchInput";

const MovieSearchBar = ({
  title,
  handleSearch,
  handleSortChange,
  handleSearchFilter,
}: MoviesSearchBarProps) => {
  const handleSortDropdownItem = (item: DropdownItemProps) => {
    const sortValue = item.value as SortValueTypes;
    handleSortChange(sortValue);
  };

  const handleFilterDropdownItem = (item: DropdownItemProps) => {
    const filterValue = item.value as string;
    handleSearchFilter(filterValue);
  };

  return (
    <div className="search-bar">
      <h4 className="search-bar__title">{title}</h4>

      <div className="search-bar__search">
        <MovieSearchInput
          icon={<SearchIcon />}
          modifierClass=""
          handleInputChange={handleSearch}
          handleDropdownItem={handleFilterDropdownItem}
        />

        <div className="search-bar__filter">
          <Dropdown
            title="Sorting"
            icon={<SortIcon />}
            items={MOVIES_DROPDOWN_SORT_ITEMS}
            handleDropdownItem={handleSortDropdownItem}
            modifierClass={"dropdown--md-wide dropdown--ml-20"}
          />
        </div>
      </div>
    </div>
  );
};
export default MovieSearchBar;
