import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

// Components
import Loader from "../Loader/Loader";
import MovieCard from "./MovieCard";
import MoviesHeader from "./MoviesHeader";
import Pagination from "../Pagination/Pagination";

// Configs
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Hooks
import useDebounce from "../../hooks/useDebounce";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleListFilter from "../../utils/handleListFilter";
import handleGetYear from "../../utils/handleGetYear";

// Interfaces
import { GenreApiProps, MovieApiProps, MovieContentProps } from "../../pages/Movies/interfaces";
import { SortValueTypes } from "./interfaces";

// Icons
import { ReactComponent as HeartIcon } from "../../assets/images/heart.svg";

const MovieContent = ({ title, apiKey }: MovieContentProps) => {
  const { handleFetch } = handleFetchCall();

  // Read list from local storage
  let favoriteMoviesIdsList = localStorage.getItem("favoritesList")
    ? JSON.parse(localStorage.getItem("favoritesList") || "")
    : [];

  /*================
  HANDLE FAVORITE BUTTON 

  Adds or removes the movie from list of favorites
  ================*/
  const handleAddMovieToFavorites = (movieId: number) => {
    favoriteMoviesIdsList = favoriteMoviesIdsList.includes(movieId)
      ? favoriteMoviesIdsList.filter((id: number) => id != movieId)
      : [...favoriteMoviesIdsList, movieId];

    // Stores the new list to local storage
    localStorage.setItem("favoritesList", JSON.stringify(favoriteMoviesIdsList));
  };

  /*================
   Pagination

   Fetch movies based on what page we are on. 
   Page has offset in the fetch because the pages start from 1.
  ================*/
  // Store the current page starting from 0
  const [page, setPage] = useState<number>(0);

  // Set selected page in state
  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected);
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
    SORT AND FILTER PARAMETERS

  Get the parameters on input change 
  ================*/

  const [searchInput, setSearchInput] = useState<string>("");

  const [sortParameter, setSortFilter] = useState<SortValueTypes | null>(null);

  // Store the value of the search input
  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  // Store the parameter for sorting
  const handleSortChange = (value: SortValueTypes) => {
    setSortFilter(value);
  };

  // Debounce the input to update every second
  const debouncedSearch = useDebounce(searchInput, 1000);

  const moviesList: Record<string, any> = useMemo(() => {
    if (!movies || !Object.entries(movies).length) return [];

    let moviesList = movies.results;
    // Filter movies if there is a input
    if (debouncedSearch) {
      moviesList = handleListFilter(moviesList, debouncedSearch, "title");
    }

    // Sort movies if a parameter is selected
    if (sortParameter) {
      moviesList.sort((a: Record<string, any>, b: Record<string, any>) => {
        return b[sortParameter] > a[sortParameter] ? 1 : -1;
      });

      if (sortParameter === "title") return moviesList.reverse();
    }

    return moviesList;
  }, [debouncedSearch, sortParameter, movies]);

  return (
    <>
      <div className="breadcrumbs">Home</div>
      <MoviesHeader
        title={title}
        handleSearch={(searchValue: string) => handleSearch(searchValue)}
        handleSortChange={(sortValue: SortValueTypes) => handleSortChange(sortValue)}
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
                  favoriteIcon={<HeartIcon />}
                  movieId={movie.id}
                  key={movie.id}
                  poster={
                    movie.poster_path
                      ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                      : undefined
                  }
                  title={movie.title}
                  year={handleGetYear(movie.release_date)}
                  language={movie.original_language}
                  genre={genre?.name}
                  votes={movie.vote_average}
                  isInFavorites={favoriteMoviesIdsList.includes(movie.id)}
                  handleAddToFavorites={handleAddMovieToFavorites}
                />
              );
            })}
          </div>

          {!searchInput ? (
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
          ) : (
            <div className="txt--center txt--white">No Results </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default MovieContent;
