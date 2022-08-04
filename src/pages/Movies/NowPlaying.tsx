import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";

// Components
import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/Movies/MovieCard";
import MoviesHeader from "../../components/Movies/MoviesHeader";

import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Hooks
import useDebounce from "../../hooks/useDebounce";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";

// Interfaces
import { GenreProps, MovieProps } from "./interfaces";

function NowPlaying() {
  const { handleFetch } = handleFetchCall();

  /*================
   Pagination

   Fetch movies based on what page we are on. 
   Page has offset in the fetch because the pages start from 1.
  ================*/
  // Store the current page starting from 0
  const [page, setPage] = useState(0);

  // Set selected page in state
  const handlePageClick = (event: any) => {
    setPage(event.selected);
  };

  // Get the genres ids and names from API
  const { status: statusGenres, data: genres } = useQuery(["genres"], () =>
    handleFetch(`${API_ENDPOINT_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`, "GET"),
  );

  // Get the movies from API at the selected page
  const { status: statusMovies, data: movies } = useQuery(["movies", page + 1], () =>
    handleFetch(
      `${API_ENDPOINT_BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page + 1}`,
      "GET",
    ),
  );

  /*================
    RATING STARS

   Return the number of stars based on the movie average votes
  ================*/
  const getStarsNumber = (rating: number) => {
    if (rating > 8) {
      return 5;
    } else if (rating == 8) {
      return 4.5;
    } else if (rating < 8 && rating > 6) {
      return 4;
    } else if (rating == 6) {
      return 3.5;
    } else if (rating < 6 && rating > 4) {
      return 3;
    } else if (rating == 4) {
      return 2.5;
    } else if (rating < 4 && rating > 2) {
      return 2;
    } else if (rating == 2) {
      return 1.5;
    } else if (rating <= 2 && rating != 0) {
      if (rating == 1) return 0.5;
      return 1;
    } else return 0;
  };

  /*================
    FILTER MOVIES

   Filter the movies by the input in the search 
  ================*/
  const filterMovies = () => {
    let filteredMovies = [];
    //check if input is not empty
    if (debouncedSearch != null && debouncedSearch != "") {
      filteredMovies = movies.results.filter((movie: MovieProps) =>
        movie.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    // return original list if there is not input
    const movieList =
      debouncedSearch != "" && debouncedSearch != null ? filteredMovies : movies.results;

    //sort if a sort parameter is chosen
    return sortMovies(movieList);
  };

  /*================
    SORT MOVIES

   Sort movies by parameter if one is chosen 
  ================*/
  const sortMovies = (movieList: any) => {
    if (sortFilter != null) {
      movieList.sort((a: MovieProps, b: MovieProps) => {
        return b[sortFilter] > a[sortFilter] ? 1 : -1;
      });

      if (sortFilter === "title") return movieList.reverse();
    }
    return movieList;
  };

  /*================
    SORT AND FILTER PARAMETERS

  Get the parameters on input change 
  ================*/
  const [searchInput, setSearchInput] = useState<string | null>(null);

  const [sortFilter, setSortFilter] = useState<"title" | "release_date" | "vote_average" | null>(
    null,
  );

  // Debounce the input to update every second
  const debouncedSearch = useDebounce(searchInput, 1000);

  const handleSearch = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleSortChange = (value: any) => {
    setSortFilter(value);
  };

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">Home</div>
        <MoviesHeader
          title="Now Playing"
          handleSearch={(e: any) => handleSearch(e)}
          handleSortChange={(e: any) => handleSortChange(e)}
        />

        {statusGenres === "success" && statusMovies === "success" ? (
          <>
            <div className="row mt--30">
              {filterMovies().map((movie: MovieProps) => {
                const genre = genres.genres.filter(
                  (genre: GenreProps) => genre.id === movie.genre_ids[0],
                )[0];
                return (
                  <MovieCard
                    rating={movie.vote_average}
                    key={movie.id}
                    poster={movie.poster_path}
                    title={movie.title}
                    year={movie.release_date}
                    language={movie.original_language}
                    genre={genre?.name}
                    starsNumber={getStarsNumber(movie.vote_average)}
                  />
                );
              })}
            </div>

            <div className="page-info">
              <div className="page-info__details">
                Showing {movies.results.length + 20 * page} from {movies.total_results} data
              </div>

              <ReactPaginate
                breakLabel="..."
                nextLabel="Next >> "
                previousLabel="<< Previous"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={movies.total_pages}
                forcePage={page}
                className="pagination"
                previousClassName="pagination__button"
                previousLinkClassName="pagination__button-label"
                pageClassName="pagination__pages"
                pageLinkClassName="pagination__pages-label"
                disabledClassName="pagination__button--disabled"
                disabledLinkClassName="pagination__button-label--disabled"
                nextClassName="pagination__button"
                nextLinkClassName="pagination__button-label"
                activeClassName="pagination__pages--active"
                activeLinkClassName="pagination__pages-label--active"
                breakClassName="pagination__pages"
                breakLinkClassName="pagination__pages-label"
              />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
export default NowPlaying;
