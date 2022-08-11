import MovieListItem from "../../components/Movies/MovieListItem";
import MoviesHeader from "../../components/Movies/MoviesHeader";

const Search = () => {
  return (
    <>
      <div className="breadcrumbs">Home</div>

      <div className="row">
        <div className="col-4"></div>
        <div className="col-8">
          <MoviesHeader
            title="Search"
            handleSearch={() => {
              console.log("a");
            }}
            handleSortChange={() => {
              console.log("a");
            }}
          />

          <MovieListItem />
        </div>
      </div>
    </>
  );
};
export default Search;
