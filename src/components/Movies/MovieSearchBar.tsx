import { useState } from "react";

// Icons
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import { ReactComponent as SortIcon } from "../../assets/images/filter.svg";

// Interfaces
import { MoviesSearchBarProps, SortOrderTypes, SortValueTypes } from "./interfaces";
import { DropdownItemProps } from "../Dropdown/interfaces";

// Statics
import { MOVIES_DROPDOWN_SORT_ITEMS } from "../../page/Movies/statics";

// Components
import Dropdown from "../Dropdown/Dropdown";
import MovieSearchInput from "./MovieSearchInput";
import Datepicker from "../Datepicker/Datepicker";

const MovieSearchBar = ({
  title,
  inputValue,
  dateRange,
  handleDateRangeChange,
  handleSearch,
  handleSortChange,
  handleSearchFilter,
  handleSortOrderChange,
}: MoviesSearchBarProps) => {
  const handleSortDropdownItem = (item: DropdownItemProps) => {
    const sortValue = item.value as SortValueTypes;
    handleSortChange(sortValue);
  };
  // Store the value of the sort order in state
  const [sortOrder, setSortOrder] = useState<SortOrderTypes>("asc");

  // Pass the value of the selected dropdown item to the function
  const handleFilterDropdownItem = (item: DropdownItemProps) => {
    const filterValue = item.value as string;
    handleSearchFilter(filterValue);
  };

  // Toggle between ascending and descending order on icon click
  const handleSortOrderClick = () => {
    if (sortOrder == "asc") {
      setSortOrder("desc");
      handleSortOrderChange("desc");
    } else {
      setSortOrder("asc");
      handleSortOrderChange("asc");
    }
  };

  const handleInputChange = (value: string) => {
    handleSearch(value);
  };

  return (
    <div className="search-bar">
      <h4 className="search-bar__title hide-mobile">{title}</h4>

      <div className="search-bar__search">
        <MovieSearchInput
          icon={<SearchIcon />}
          modifierClass=""
          handleInputChange={handleInputChange}
          handleDropdownItem={handleFilterDropdownItem}
          inputValue={inputValue}
        />

        <div className="search-bar__datepicker">
          <Datepicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            handleDateRange={handleDateRangeChange}
          />
        </div>
        <div className="search-bar__filter">
          <div
            className={`search-bar__filter-icon ${sortOrder == "desc" ? "search-bar__filter-icon--flipped" : ""
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
    </div >
  );
};
export default MovieSearchBar;
