// Icons
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import { ReactComponent as SortIcon } from "../../assets/images/filter.svg";

// Interfaces
import { MoviesSearchBarProps, SortOrderTypes, SortValueTypes } from "./interfaces";
import { DropdownItemProps } from "../Dropdown/interfaces";

// Statics
import { MOVIES_DROPDOWN_SORT_ITEMS } from "../../pages/Movies/statics";

// Components
import Dropdown from "../Dropdown/Dropdown";

// Icons

import MovieSearchInput from "./MovieSearchInput";
import { useState } from "react";

const MovieSearchBar = ({
  title,
  handleSearch,
  handleSortChange,
  handleSearchFilter,
  handleSortOrderChange,
}: MoviesSearchBarProps) => {
  const handleSortDropdownItem = (item: DropdownItemProps) => {
    const sortValue = item.value as SortValueTypes;
    handleSortChange(sortValue);
  };

  const [sortOrder, setSortOrder] = useState<SortOrderTypes>("asc");

  const handleFilterDropdownItem = (item: DropdownItemProps) => {
    const filterValue = item.value as string;
    handleSearchFilter(filterValue);
  };

  const handleSortOrderClick = () => {
    if (sortOrder == "asc") {
      setSortOrder("desc");
      handleSortOrderChange("desc");
    } else {
      setSortOrder("asc");
      handleSortOrderChange("asc");
    }
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
          <div
            className={`search-bar__filter-icon ${
              sortOrder == "desc" ? "search-bar__filter-icon--flipped" : ""
            }`}
            onClick={handleSortOrderClick}
          >
            <SortIcon />
          </div>

          <Dropdown
            title="Sorting"
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
