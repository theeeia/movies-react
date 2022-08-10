import { FormToggleButtonProps } from "./interfaces";

const FormToggleButton = (properties: FormToggleButtonProps) => {
  const { label, ...props } = properties;

  return (
    <div className="toggle">
      <label> {label}</label>
      <label className="toggle__switch">
        <input type="checkbox" {...props} />
        <span className="toggle__slider"></span>
      </label>
    </div>
  );
};

export default FormToggleButton;
