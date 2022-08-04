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
  const itemsPerPage = 20;

  // Get the genres ids and names from API
  const { status: statusGenres, data: genres } = useQuery(["genres"], () =>
    handleFetch(`${API_ENDPOINT_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`, "GET"),
  );
  const [pageCount, setPageCount] = useState(1);

  // Get the movies from API
  const { status: statusMovies, data: movies } = useQuery(["movies", pageCount], () =>
    handleFetch(
      `${API_ENDPOINT_BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${pageCount}`,
      "GET",
    ),
  );

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % movies.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);

    setPageCount(Math.ceil(movies.length / itemsPerPage));
  };

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
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
            />

            {/* <div>
              <span>Current Page: {page + 1}</span>
              <button onClick={() => setPage(old => Math.max(old - 1, 0))} disabled={page === 1}>
                Previous Page
              </button>
              <button
                onClick={() => {
                  if (movies.total_pages != page) {
                    setPage(old => old + 1);

                    //isPreviousData is always false
                    console.log(isPreviousData);
                  }
                }}
                // Disable the Next Page button until we know a next page is available
                disabled={movies.total_pages == page}
              >
                Next Page
              </button>
            </div> */}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
export default NowPlaying;
