export interface CheckboxProps {
  label: string;
  name: string;
  type: string;
  checked: boolean;
  onChange: (genre: string) => void;
}
