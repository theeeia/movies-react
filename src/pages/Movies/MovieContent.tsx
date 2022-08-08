import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

// Components
import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/Movies/MovieCard";
import MoviesHeader from "../../components/Movies/MoviesHeader";
import Pagination from "../../components/Pagination/Pagination";

// Configs
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Hooks
import useDebounce from "../../hooks/useDebounce";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleListFilter from "../../utils/handleListFilter";
import handleListSort from "../../utils/handleListSort";

// Interfaces
import { GenreApiProps, MovieApiProps, MovieContentProps } from "./interfaces";

const MovieContent = ({ title, apiKey }: MovieContentProps) => {
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
  const { status: statusMovies, data: movies } = useQuery([`movies-${apiKey}`, page + 1], () =>
    handleFetch(
      `${API_ENDPOINT_BASE}/movie/${apiKey}?api_key=${API_KEY}&language=en-US&page=${page + 1}`,
      "GET",
    ),
  );

  /*================
    RATING STARS

   Return the number of stars based on the movie average votes
  ================*/
  const getStarsNumberFromRating = (rating: number) => {
    let count = 1;
    while (rating > 0) {
      // Add a star if rating is greater than two
      if (rating - 2 > 0) {
        count++;
        // Subtract rating by 2
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

  const [sortParameter, setSortFilter] = useState<"title" | "release_date" | "vote_average" | null>(
    null,
  );

  // Store the value of the search input
  const handleSearch = (e: any) => {
    setSearchInput(e.target.value);
  };

  // Store the parameter for sorting
  const handleSortChange = (value: any) => {
    setSortFilter(value);
  };

  // Debounce the input to update every second
  const debouncedSearch = useDebounce(searchInput, 1000);

  const moviesList: Record<string, any> = useMemo(() => {
    if (!movies || !Object.entries(movies).length) return [];

    let moviesList = movies.results;
    // Filter movies if there is a input
    if (debouncedSearch) {
      moviesList = handleListFilter(moviesList, debouncedSearch);
    }

    // Sort movies if a parameter is selected
    if (sortParameter) {
      moviesList = handleListSort(moviesList, sortParameter);
    }

    return moviesList;
  }, [debouncedSearch, sortParameter, movies]);

  return (
    <>
      <div className="container default-page-height">
        <div className="breadcrumbs">Home</div>
        <MoviesHeader
          title={title}
          handleSearch={(e: any) => handleSearch(e)}
          handleSortChange={(e: any) => handleSortChange(e)}
        />

        {statusGenres === "success" && statusMovies === "success" ? (
          <>
            <div className="row">
              {moviesList.map((movie: MovieApiProps) => {
                const genre = genres.genres.filter(
                  (genre: GenreApiProps) => genre.id === movie.genre_ids[0],
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
                    starsNumber={getStarsNumberFromRating(movie.vote_average)}
                  />
                );
              })}
            </div>

            <div className="page-info">
              <div className="page-info__details">
                Showing {movies.results.length + 20 * page} from {movies.total_results} data
              </div>

              {!searchInput && (
                <Pagination
                  handlePageClick={handlePageClick}
                  totalPages={movies.total_pages}
                  page={page}
                />
              )}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
export default MovieContent;
