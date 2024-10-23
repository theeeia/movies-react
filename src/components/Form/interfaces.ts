import React from "react";

export interface FormCheckboxProps {
  label: string;
  name: string;
  type: string;
  checked?: boolean;
}

export interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  icon?: React.ReactNode;
  handleIconClick?: () => void;
}

export interface FormToggleButtonProps {
  label: string;
  name: string;
  checked: boolean;
}
export interface FormButtonProps {
  label: string | React.ReactNode;
  modifierClass: string;
  isDisabled: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  handleOnClick?: () => void;
}
