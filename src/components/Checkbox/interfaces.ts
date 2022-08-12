export interface CheckboxProps {
  id: number;
  label: string;
  name: string;
  type: string;
  checked: boolean;
  onChange: (genre: string) => void;
}
