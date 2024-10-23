import { FormButtonProps } from "./interfaces";

const FormButton = ({
  label,
  modifierClass,
  type = "button",
  isDisabled = false,
  handleOnClick,
}: FormButtonProps) => {
  return (
    <button
      onClick={handleOnClick}
      type={type}
      disabled={isDisabled}
      className={`btn ${modifierClass} ${isDisabled && "btn--disabled"}`}
    >
      {label}
    </button>
  );
};

export default FormButton;
