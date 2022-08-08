import { FormButtonProps } from "./interfaces";

const FormButton = ({
  label,
  modifierClass,
  type = "button",
  isDisabled = false,
  onClick = () => {
    return;
  },
}: FormButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className={`btn ${modifierClass} ${isDisabled && "btn--disabled"}`}
    >
      {label}
    </button>
  );
};

export default FormButton;
