import { DropdownProps } from "./interfaces";

function Dropdown(props: DropdownProps) {
  const { user, dropdownItems } = props;

  return (
    <div className="navigation__dropdown">
      <div className="dropdown">
        <button className="dropdown__button">{user}</button>
        <div className="dropdown__content">
          {dropdownItems.map((item: any, index: number) => {
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
export default Dropdown;
