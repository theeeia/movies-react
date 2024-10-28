import { useRef, useState } from "react";

// Hooks
import useOnClickOutside from "../../hooks/useOnClickOutside";
// Components
import Loader from "../Loader/Loader";
// Interfaces
import { DropdownItemProps, DropdownProps } from "./interfaces";

const Dropdown = ({
  title = "",
  items,
  handleDropdownItem,
  icon,
  downIcon,
  isDisplayedTextStatic = false,
  isLoading = false,
  modifierClass = "",
  disabled = false,
}: DropdownProps) => {
  const [displayText, setDisplayedText] = useState<string>(title);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleDropdownMenu = () => {
    if (disabled) return;
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickedItem = (item: DropdownItemProps) => {
    // Prevent function call if item is disabled
    if (item.disabled) return;

    // Update the text to be displayed
    // if the dropdown is not supposed to be static
    // Dont show title if its empty
    if (title !== "") {
      if (!isDisplayedTextStatic) setDisplayedText(item.text);
    }
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
      className={`dropdown ${disabled ? `dropdown--disabled` : ""} ${modifierClass}`}
      onClick={handleDropdownMenu}
      ref={dropdownMenuRef}
    >
      <div className="dropdown__button">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {icon && icon}
            <span className="dropdown__title"> {displayText}</span>
            {downIcon && downIcon}
          </>
        )}
      </div>

      {isMenuOpen && (
        <ul className="dropdown__content">
          {items.map((item: DropdownItemProps, index: number) => (
            <li
              key={`${item.text}-${index}`}
              className={`dropdown__item ${item.disabled ? "dropdown__item--disabled" : ""}`}
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

export default Dropdown;
