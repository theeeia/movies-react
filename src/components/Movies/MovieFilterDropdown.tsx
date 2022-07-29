//import { ReactComponent as FilterIcon } from "../../assets/images/filter.svg";
function MovieFilterDropdown(props: any) {
  const { handleFilterChange } = props;
  return (
    <select className="movie-filter-dropdown" onChange={handleFilterChange}>
      <option value="newest" className="movie-filter-dropdown__option">
        Newest
      </option>
      <option value="title" className="movie-filter-dropdown__option">
        Title
      </option>
      <option value="popular" className="movie-filter-dropdown__option">
        Popular
      </option>
    </select>
  );
}
export default MovieFilterDropdown;
