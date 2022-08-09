import { parseISO, getYear } from "date-fns";
/**
 *  Utility for parsing date from string and returning the year
 * @param date The date as a string
 */
const handleGetYear = (date: string) => {
  const dates = parseISO(date);
  return getYear(dates).toString();
};

export default handleGetYear;
