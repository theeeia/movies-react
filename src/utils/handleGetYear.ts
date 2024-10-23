import { parseISO, getYear } from "date-fns";
/**
 *  Utility for parsing date from string and returning the year as string
 * @param date The date as a string
 */
const handleGetYear = (date: string) => {
  const parsedDate = parseISO(date);
  return getYear(parsedDate).toString();
};

export default handleGetYear;
