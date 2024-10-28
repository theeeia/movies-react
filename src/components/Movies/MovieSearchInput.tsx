// Statics
import { MOVIES_SEARCH_FILTER_ITEMS } from "../../page/Movies/statics";

// Components
import Dropdown from "../Dropdown/Dropdown";

// Icons
import { ReactComponent as DropdownArrow } from "../../assets/images/dropdown-arrow.svg";

// Interfaces
import { MovieSearchInputProps } from "./interfaces";

const MovieSearchInput = ({
  icon,
  modifierClass = "",
  inputValue,
  handleInputChange,
  handleDropdownItem,
}: MovieSearchInputProps) => {
  return (
    <div className={`search-input ${modifierClass}`}>
      {icon}
      <span>
        <input
          className="search-input__input"
          placeholder="Search titles here..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event.currentTarget.value)
          }
          value={inputValue}
        />
      </span>

      <span className="search-input__dropdown">
        <Dropdown
          icon={<DropdownArrow />}
          items={MOVIES_SEARCH_FILTER_ITEMS}
          handleDropdownItem={handleDropdownItem}
          modifierClass={"dropdown--no-title dropdown--ml-n30"}
        />
      </span>
    </div>
  );
};
export default MovieSearchInput;
