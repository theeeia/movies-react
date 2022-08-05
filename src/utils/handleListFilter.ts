/*================
    FILTER List

   Filter the list by input
  ================*/
const handleListFilter = (list: any, searchValue: string) => {
  return list.filter((item: Record<string, any>) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
};
export default handleListFilter;
