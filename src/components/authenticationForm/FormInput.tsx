import { useField } from "formik";

// Interfaces
import { FormInputProps } from "./interfaces";

export default function FormInput(props: FormInputProps) {
  const { label, required, handleIconClick, icon, ...properties } = props;
  const [field, meta] = useField(properties);

  return (
    <div>
      <label htmlFor={label} className="form__label">
        {label}
        {required && "*"}
      </label>

      <div className="form__field">
        <input
          {...field}
          {...properties}
          className={`form__input  ${meta.touched && meta.error && "form__input--error"}`}
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
}
