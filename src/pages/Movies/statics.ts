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

export const MOVIES_SEARCH_FILTER_ITEMS: DropdownItemProps[] = [
  {
    text: "Title",
    value: "movie",
  },
  {
    text: "Director",
    value: "director",
  },
  {
    text: "Actor",
    value: "actor",
  },
];
