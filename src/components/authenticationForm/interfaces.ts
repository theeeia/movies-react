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
  icon?: React.ReactNode;
  handleIconClick?: () => void;
  required: boolean;
}

export interface FormToggleButtonProps {
  label: string;
  name: string;
  checked: boolean;
}
