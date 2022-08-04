import { useState } from "react";
import { MovieSortDropdownItemProps, MovieSortDropdownProps } from "./interfaces";

function MovieSortDropdown(props: MovieSortDropdownProps) {
  const { sortIcon, dropdownItems, handleSortChange } = props;

  const [activeSortIndex, setActiveSortIndex] = useState(0);

  const { label, value } = dropdownItems[activeSortIndex];

  return (
    <div className="dropdown dropdown--md-wide">
      <button className="dropdown__button" value={value}>
        {sortIcon}
        {label}
      </button>

      <div className="dropdown__content ml--20 dropdown--md-wide">
        {dropdownItems.map((item: MovieSortDropdownItemProps, index: number) => {
          const { label, value, ...props } = item;
          if (index != activeSortIndex) {
            return (
              <button
                key={index}
                {...props}
                onClick={() => {
                  setActiveSortIndex(index);
                  handleSortChange(value);
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
export default MovieSortDropdown;
