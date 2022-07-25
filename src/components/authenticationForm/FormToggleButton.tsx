const FormToggleButton = ({
  field: { name, value, onChange },
  id,
  label,
  classNames,
  ...props
}: any) => {
  return (
    <div className="form__toggle">
      <label htmlFor={id} className="form__label">
        {label}
      </label>
      <input
        name={name}
        id={id}
        type="radio"
        value={id}
        checked={id === value}
        onChange={onChange}
        onClick={onChange}
        className={classNames}
        {...props}
      />
    </div>
  );
};
export default FormToggleButton;
