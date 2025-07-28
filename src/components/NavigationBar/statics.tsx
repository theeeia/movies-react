import { DropdownItemProps } from "../Dropdown/interfaces";

import { ReactComponent as SettingsIcon } from "../../assets/images/settings.svg";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";

export const NAVIGATION_DROPDOWN_ITEMS: DropdownItemProps[] = [
  {
    text: "Settings",
    icon: <SettingsIcon />,
    value: "/account/edit",
  },
  {
    text: "Log out",
    icon: <LogoutIcon />,
    value: "logout",
  },
];
