import { useState } from "react";
import { MovieFilterDropdownItemProps, MovieFilterDropdownProps } from "./interfaces";

function MovieFilterDropdown(props: MovieFilterDropdownProps) {
  const { filterIcon, dropdownItems, handleFilterChange } = props;

  const [activeFilterIndex, setActiveFilterIndex] = useState(0);

  const { label, value } = dropdownItems[activeFilterIndex];

  return (
    <div className="dropdown dropdown--md-wide">
      <button className="dropdown__button" value={value}>
        {filterIcon}
        {label}
      </button>

      <div className="dropdown__content ml--20 dropdown--md-wide">
        {dropdownItems.map((item: MovieFilterDropdownItemProps, index: number) => {
          const { label, value, ...props } = item;
          if (index != activeFilterIndex) {
            return (
              <button
                key={index}
                {...props}
                onClick={() => {
                  setActiveFilterIndex(index);
                  handleFilterChange(value);
                }}
              >
                {label}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}
export default MovieFilterDropdown;
