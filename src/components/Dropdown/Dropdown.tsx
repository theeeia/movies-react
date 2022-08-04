import { useEffect, useRef, useState } from "react";

// Interfaces
import { DropdownProps } from "./interfaces";

const Dropdown = ({
  dropdownBorderClass,
  modifierClass,
  defaultValue,
  isButtonStatic,
  icon,
  handleChange,
  dropdownItems,
}: DropdownProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Take selected item or default static value for button
  const { label, value } = !isButtonStatic
    ? { label: defaultValue, value: defaultValue }
    : dropdownItems[activeIndex];

  /*================
    OPEN MENU

   Open menu on button click or close it if clicked outside
  ================*/
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (e.path[0] !== menuButtonRef.current) {
        setIsMenuOpen(false);
      }
    };

    document.body.addEventListener("click", closeDropdown);

    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className={`dropdown ${modifierClass}`}>
      <button
        ref={menuButtonRef}
        className={`dropdown__button  ${dropdownBorderClass}`}
        value={value}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {icon}
        {label}
      </button>

      <div
        className={`dropdown__content ${dropdownBorderClass} ${modifierClass} ${
          isMenuOpen && "dropdown__clicked"
        }`}
      >
        {dropdownItems.map((item: any, index: number) => {
          const { label, value, ...properties } = item;

          if (isButtonStatic && index == activeIndex) return;

          return (
            <button
              key={index}
              {...properties}
              onClick={() => {
                setIsMenuOpen(false);
                setActiveIndex(index);
                handleChange(value);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Dropdown;
