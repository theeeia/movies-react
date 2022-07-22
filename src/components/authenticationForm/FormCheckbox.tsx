import { useField } from "formik";

// Interfaces
import { FormCheckboxProps } from "./interfaces";

export default function FormCheckbox(props: FormCheckboxProps) {
  const { label, ...properties } = props;

  const [field] = useField(properties);
  return (
    <>
      <div className="form__checkbox">
        <input {...field} {...properties} className={"form__checkbox-input"} />
        <p className="form__checkbox-label">{label}</p>
      </div>
    </>
  );
}
