import { useField } from "formik";
import React from "react";
import { FormCheckboxProps } from "./interfaces";

export default function FormCheckbox(props: FormCheckboxProps) {
  const { label, ...properties } = props;

  const [field, meta] = useField(properties);
  return (
    <>
      <div className="form_checkbox">
        <input {...field} {...properties} className={"form_checkbox--input"} />
        <p className="form_checkbox--label">{label}</p>
      </div>
    </>
  );
}
