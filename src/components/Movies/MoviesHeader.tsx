import { useState } from "react";

// Icons
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import { ReactComponent as SortIcon } from "../../assets/images/filter.svg";

// Interfaces
import { MoviesHeaderProps, SortOrderTypes, SortValueTypes } from "./interfaces";
import { DropdownItemProps } from "../Dropdown/interfaces";

// Statics
import { MOVIES_DROPDOWN_SORT_ITEMS } from "../../page/Movies/statics";

// Components
import Dropdown from "../Dropdown/Dropdown";

const MoviesHeader = ({
  title,
  handleSearch,
  handleSortChange,
  handleSortOrderChange,
}: MoviesHeaderProps) => {
  const handleDropdownItem = (item: DropdownItemProps) => {
    const sortValue = item.value as SortValueTypes;
    handleSortChange(sortValue);
  };
  const [sortOrder, setSortOrder] = useState<SortOrderTypes>("asc");
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
    <div className="movies-header">
      <h4 className="movies-header__title">{title}</h4>

      <div className="movies-header__search">
        <div className="movies-header__search-box">
          <SearchIcon />
          <input
            className="movies-header__input"
            placeholder="Search titles here..."
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(event.currentTarget.value)
            }
          />
        </div>
        <div className="movies-header__filter">
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
            handleDropdownItem={handleDropdownItem}
            modifierClass={"dropdown--md-wide "}
          />
        </div>
      </div>
    </div>
  );
};
export default MoviesHeader;
