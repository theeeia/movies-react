/*================
    SORT MOVIES

   Sort list by parameter if one is chosen 
  ================*/
const handleListSort = (
  list: any,
  sortFilter: "title" | "release_date" | "vote_average" | null,
) => {
  if (sortFilter != null) {
    list.sort((a: Record<string, any>, b: Record<string, any>) => {
      return b[sortFilter] > a[sortFilter] ? 1 : -1;
    });

    if (sortFilter === "title") return list.reverse();
  }
  return list;
};
export default handleListSort;
