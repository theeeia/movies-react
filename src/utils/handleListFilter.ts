/*================
    FILTER List

   Filter the list by input
  ================*/
const handleListFilter = (list: any, searchValue: string) => {
  let filteredList = [];
  //check if input is not empty

  filteredList = list.filter((item: Record<string, any>) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return filteredList;
};
export default handleListFilter;
