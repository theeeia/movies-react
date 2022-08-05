/*================
    FILTER List

   Filter the list by the input in the search 
  ================*/
const handleListFilter = (list: any, searchValue: string) => {
  let filteredList = [];
  //check if input is not empty
  if (searchValue != null && searchValue != "") {
    filteredList = list.results.filter((item: Record<string, any>) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  // return the filtered list or the original if there is no filter input
  return searchValue != "" && searchValue != null ? filteredList : list.results;
};
export default handleListFilter;
