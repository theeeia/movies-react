export interface DropdownProps {
  dropdownBorderClass?: string;
  modifierClass?: string;
  defaultValue?: string;
  isButtonStatic?: boolean;
  icon: React.ReactNode;
  handleChange: (arg: string) => void;
  dropdownItems: Record<string, any>;
}
