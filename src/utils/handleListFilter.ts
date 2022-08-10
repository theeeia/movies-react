/**
 *  Utility for filtering a list by a parameter and search value
 * Used for example for filtering movie titles by a value
 * @param list The list that needs to be filtered
 * @param searchValue A value that we filter by
 * @param searchParameter A list parameter that the filter is used on
 */
const handleListFilter = (list: any, searchValue: string, searchParameter: string) => {
  return list.filter((item: Record<string, any>) =>
    item[searchParameter].toLowerCase().includes(searchValue.toLowerCase()),
  );
};
export default handleListFilter;
