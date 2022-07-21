import React from "react";

function FormButton({ ...props }) {
  const { label,classes, ...properties } = props;

  return <button {...properties} className={classes} >{label}</button>;
}

export default FormButton;
