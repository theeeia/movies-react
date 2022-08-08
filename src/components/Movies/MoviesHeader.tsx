// Icons
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import { ReactComponent as SortIcon } from "../../assets/images/filter.svg";

// Interfaces
import { MoviesHeaderProps, SortValueTypes } from "./interfaces";
import { DropdownItemProps } from "../Dropdown/interfaces";

// Statics
import { MOVIES_DROPDOWN_SORT_ITEMS } from "../../pages/Movies/statics";

// Components
import Dropdown from "../Dropdown/Dropdown";

const MoviesHeader = ({ title, handleSearch, handleSortChange }: MoviesHeaderProps) => {
  const handleDropdownItem = (item: DropdownItemProps) => {
    const sortValue = item.value as SortValueTypes;
    handleSortChange(sortValue);
  };

  return (
    <div className="movies-header">
      <div className="movies-header__title">{title}</div>

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
          <Dropdown
            title="Sorting"
            icon={<SortIcon />}
            items={MOVIES_DROPDOWN_SORT_ITEMS}
            handleDropdownItem={handleDropdownItem}
            modifierClass={"dropdown--md-wide dropdown--ml-20"}
          />
        </div>
      </div>
    </div>
  );
};
export default MoviesHeader;
