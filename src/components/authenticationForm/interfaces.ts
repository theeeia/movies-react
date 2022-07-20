export interface FormCheckboxProps {
  label: string;
  name: string;
  type: string;
}

export interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  showIcon?: string;
  icon?: React.ReactNode;
  handleIconClick?: () => void;
  required: boolean;
}
