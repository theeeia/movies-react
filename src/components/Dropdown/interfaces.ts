export interface DropdownItemProps {
  text: string;
  value: string | number | boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  items: DropdownItemProps[];
  handleDropdownItem: (item: DropdownItemProps) => void;
  title?: string;
  icon?: React.ReactNode;
  downIcon?: React.ReactNode;
  isDisplayedTextStatic?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  modifierClass?: string;
}
