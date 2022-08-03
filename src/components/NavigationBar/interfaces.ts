export interface NavigationBarDropdownProps {
  user: React.ReactNode;
  dropdownItems: any;
}

export interface NavigationDropdownItemProps {
  label: string;
  className: string;
  onClick: () => void;
}
