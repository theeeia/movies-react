import { CheckboxProps } from "./interfaces";

const Checkbox = ({ onChange, label, ...props }: CheckboxProps) => {
  return (
    <div className="checkbox">
      <input
        {...props}
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
