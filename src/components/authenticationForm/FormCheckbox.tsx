import { useField } from "formik";
import React from "react";

export default function FormCheckbox(props: any) {
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
