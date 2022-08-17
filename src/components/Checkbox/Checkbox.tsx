import { CheckboxProps } from "./interfaces";

const Checkbox = ({ id, label, name, type, checked, onChange }: CheckboxProps) => {
  return (
    <div className="checkbox">
      <input
        value={id}
        type={type}
        name={name}
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
      />
      <label className="checkbox__box">
        <span></span>
        {label}
      </label>
    </div>
  );
};
export default Checkbox;
