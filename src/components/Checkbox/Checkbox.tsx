import { CheckboxProps } from "./interfaces";

const Checkbox = ({ label, name, type, checked, onChange }: CheckboxProps) => {
  return (
    <>
      <div className="checkbox">
        <input
          type={type}
          name={name}
          checked={checked}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.currentTarget.name)
          }
          className={"checkbox__input"}
        />
        <p className="checkbox__label">{label}</p>
      </div>
    </>
  );
};
export default Checkbox;
