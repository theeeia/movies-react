const FormButton = ({ ...props }) => {
  const { label, modifierClass, ...properties } = props;

  return (
    <button {...properties} className={`btn ${modifierClass}`}>
      {label}
    </button>
  );
};

export default FormButton;
