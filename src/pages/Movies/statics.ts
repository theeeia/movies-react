import { DropdownItemProps } from "../../components/Dropdown/interfaces";

export const MOVIES_DROPDOWN_SORT_ITEMS: DropdownItemProps[] = [
  {
    text: "Newest",
    value: "release_date",
  },
  {
    text: "Title",
    value: "title",
  },
  {
    text: "Popular",
    value: "vote_average",
  },
];
