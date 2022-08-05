import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Components
import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/Movies/MovieCard";
import MoviesHeader from "../../components/Movies/MoviesHeader";
import Pagination from "../../components/Pagination/Pagination";

import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Hooks
import useDebounce from "../../hooks/useDebounce";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleListFilter from "../../utils/handleListFilter";
import handleListSort from "../../utils/handleListSort";

// Interfaces
import { GenreProps, MovieProps } from "./interfaces";

const NowPlaying = () => {
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
    let count = 1;
    while (rating > 0) {
      if (rating - 2 > 0) {
        count++;
        rating -= 2;
      } else break;
    }
    return count;
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
  const handleMovies = () => {
    let moviesList = movies.results;
    if (debouncedSearch != null && debouncedSearch != "") {
      moviesList = handleListFilter(moviesList, debouncedSearch);
    }

    if (sortFilter != null) {
      moviesList = handleListSort(moviesList, sortFilter);
    }

    return moviesList;
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
              {handleMovies().map((movie: MovieProps) => {
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

              <Pagination
                handlePageClick={handlePageClick}
                totalPages={movies.total_pages}
                page={page}
              />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
export default NowPlaying;
