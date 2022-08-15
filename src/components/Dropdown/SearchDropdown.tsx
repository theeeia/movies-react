import { useRef, useState } from "react";

// Hooks
import useOnClickOutside from "../../hooks/useOnClickOutside";

// Interfaces
import { DropdownItemProps, SearchDropdownProps } from "./interfaces";

const SearchDropdown = ({
  items,
  handleDropdownItem,
  icon,
  modifierClass = "",
  disabled = false,
}: SearchDropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleDropdownMenu = () => {
    if (disabled) return;
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickedItem = (item: DropdownItemProps) => {
    // Prevent function call if item is disabled
    if (item.disabled) return;

    // Call the callback function passed as prop
    handleDropdownItem(item);

    // Close menu
    setIsMenuOpen(false);
  };

  // Close menu if clicked outside of it
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(dropdownMenuRef, () => setIsMenuOpen(false));

  return (
    <div
      className={`search-dropdown ${disabled ? `search-dropdown--disabled` : ""} ${modifierClass}`}
      onClick={handleDropdownMenu}
      ref={dropdownMenuRef}
    >
      <div className="search-dropdown__button">{icon}</div>

      {isMenuOpen && (
        <ul className="search-dropdown__content">
          {items.map((item: DropdownItemProps, index: number) => (
            <li
              key={`${item.text}-${index}`}
              className={`search-dropdown__item ${
                item.disabled ? "search-dropdown__item--disabled" : ""
              }`}
              onClick={() => handleClickedItem(item)}
            >
              {item.icon && item.icon}
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
