import { useField } from "formik";

// Interfaces
import { FormInputProps } from "./interfaces";

const FormInput = ({
  label,
  name,
  type,
  placeholder,
  icon,
  handleIconClick,
  required,
}: FormInputProps) => {
  const [field, meta] = useField({ name, type, required });

  return (
    <div>
      <label htmlFor={label} className="form__label">
        {label}
        {required && "*"}
      </label>

      <div className="form__field">
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={`form__input  ${meta.touched && meta.error ? "form__input--error" : ""}  ${icon ? "form__input--icon" : ""}`}
        />

        {icon ? (
          <div className="form__icon" onClick={handleIconClick}>
            {icon}
          </div>
        ) : null}

        {meta.touched && meta.error && <p className="form__error">{meta.error}</p>}
      </div>
    </div>
  );
};
export default FormInput;
