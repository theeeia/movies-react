import { NavigationBarDropdownProps, NavigationDropdownItemProps } from "./interfaces";

function NavigationBarDropdown(props: NavigationBarDropdownProps) {
  const { user, dropdownItems } = props;

  return (
    <div className="navigation__dropdown">
      <div className="dropdown dropdown--lg-wide">
        <button className="dropdown__button dropdown__button--border">{user}</button>
        <div className="dropdown__content dropdown__content--border dropdown--lg-wide">
          {dropdownItems.map((item: NavigationDropdownItemProps, index: number) => {
            const { label, ...props } = item;

            return (
              <button key={index} {...props}>
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default NavigationBarDropdown;
