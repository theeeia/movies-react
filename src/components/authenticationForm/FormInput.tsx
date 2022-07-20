import { useField } from "formik";
import React from "react";
import { FormInputProps } from "./interfaces";

export default function FormInput(props: FormInputProps) {
  const { label, required, handleIconClick, icon, ...properties } = props;
  const [field, meta] = useField(properties);

  return (
    <div>
      <label htmlFor={label} className="form_label">
        {label}
        {required && "*"}
      </label>

      <div className="form_field">
        <input
          {...field}
          {...properties}
          className={`form_input  ${meta.touched && meta.error && "form_input--error"}`}
        />

        {icon ? (
          <div className="form_icon" onClick={handleIconClick}>
            {icon}
          </div>
        ) : null}

        {meta.touched && meta.error ? (
          <p className="form_error">{meta.error}</p>
        ) : (
          <p className="form_error form_error--hidden">Error</p>
        )}
      </div>
    </div>
  );
}
