import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

// Icons
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import { ReactComponent as SortIcon } from "../../assets/images/filter.svg";
import { ReactComponent as DatepickerIcon } from "../../assets/images/datepicker.svg";

// Interfaces
import { MoviesSearchBarProps, SortOrderTypes, SortValueTypes } from "./interfaces";
import { DropdownItemProps } from "../Dropdown/interfaces";

// Statics
import { MOVIES_DROPDOWN_SORT_ITEMS } from "../../pages/Movies/statics";

// Components
import Dropdown from "../Dropdown/Dropdown";
import MovieSearchInput from "./MovieSearchInput";

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

  const handleInputChange = (value: any) => {
    handleSearch(value);
  };

  // Store picked date range in state

  const handleDateRange = (dates: any) => {
    handleDateRangeChange(dates);
  };

  const ExampleCustomInput = forwardRef<any, any>(({ onClick }, ref) => (
    <DatepickerIcon className={"datepicker"} onClick={onClick} ref={ref} />
  ));
  return (
    <div className="search-bar">
      <h4 className="search-bar__title">{title}</h4>

      <div className="search-bar__search">
        <MovieSearchInput
          icon={<SearchIcon />}
          modifierClass=""
          handleInputChange={handleInputChange}
          handleDropdownItem={handleFilterDropdownItem}
          inputValue={inputValue}
        />

        <div>
          <DatePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            selected={dateRange.startDate}
            onChange={handleDateRange}
            selectsRange
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            calendarStartDay={1}
            customInput={<ExampleCustomInput />}
          />
        </div>

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
