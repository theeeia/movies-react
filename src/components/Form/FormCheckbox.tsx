import { useField } from "formik";

// Interfaces
import { FormCheckboxProps } from "./interfaces";

const FormCheckbox = ({ label, name, type, checked }: FormCheckboxProps) => {
  const [field] = useField({ name, type, checked });

  return (
    <>
      <div className="form__checkbox">
        <input {...field} type={type} className={"form__checkbox-input"} />
        <p className="form__checkbox-label">{label}</p>
      </div>
    </>
  );
};
export default FormCheckbox;
