import { ReactComponent as SettingsIcon } from "../assets/images/settings.svg";
import { ReactComponent as LogoutIcon } from "../assets/images/logout.svg";

export const MOVIE_DROPDOWN_SORT_ITEMS = [
  {
    label: "Newest",
    className: "dropdown__item",
    value: "release_date",
  },
  {
    label: "Title",
    className: "dropdown__item",
    value: "title",
  },
  {
    label: "Popular",
    className: "dropdown__item",
    value: "vote_average",
  },
];

export const NAVIGATION_DROPDOWN_ITEMS = [
  {
    label: (
      <>
        <SettingsIcon />
        Settings
      </>
    ),
    value: "/account/edit",
    className: "dropdown__item dropdown__item--line",
  },
  {
    label: (
      <>
        <LogoutIcon />
        Privileges
      </>
    ),
    value: "/account/privileges",
    className: "dropdown__item dropdown__item--line",
  },
  {
    label: (
      <>
        <LogoutIcon />
        Log out
      </>
    ),
    value: "logout",
    className: "dropdown__item dropdown__item--line",
  },
];
