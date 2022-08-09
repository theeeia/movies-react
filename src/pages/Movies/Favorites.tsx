import { useQueries } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { parseISO, getYear } from "date-fns";

// Components
import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/Movies/MovieCard";
import MoviesHeader from "../../components/Movies/MoviesHeader";

// Interfaces
import { SortValueTypes } from "../../components/Movies/interfaces";
import { MovieDetailsApiProps } from "./interfaces";

// Config
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Hooks
import useDebounce from "../../hooks/useDebounce";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleListFilter from "../../utils/handleListFilter";

// Icons
import { ReactComponent as TrashIcon } from "../../assets/images/trash.svg";

const Favorites = () => {
  // Read list from local storage
  const [favoriteMoviesIdsList, setFavoriteMoviesIdsList] = useState(() =>
    localStorage.getItem("favoritesList")
      ? JSON.parse(localStorage.getItem("favoritesList") || "")
      : [],
  );

  const { handleFetch } = handleFetchCall();

  // Fetch movie details for every movie in the list
  const favoriteMoviesResponses = useQueries({
    queries: favoriteMoviesIdsList.map((movieId: number) => {
      return {
        queryKey: ["favorite-movies", movieId],
        queryFn: () =>
          handleFetch(
            `${API_ENDPOINT_BASE}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
            "GET",
          ),
      };
    }),
  });

  /*================
  HANDLE FAVORITE BUTTON 

  Removes the movie from list of favorites
  ================*/
  const handleAddMovieToFavorites = (movieId: number) => {
    const newFavoriteMoviesIdsList = favoriteMoviesIdsList.filter((id: number) => id != movieId);
    // Save new list in local storage
    localStorage.setItem("favoritesList", JSON.stringify(newFavoriteMoviesIdsList));
    // Save new list in state
    setFavoriteMoviesIdsList(newFavoriteMoviesIdsList);
  };

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
    // Check if there is data
    if (!favoriteMoviesResponses || !Object.entries(favoriteMoviesResponses).length) return [];

    // Map the query responses to a list of movies
    let moviesList = favoriteMoviesResponses.map((movie: Record<string, any>) => {
      return movie.data;
    });

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
  }, [debouncedSearch, sortParameter, favoriteMoviesResponses]);

  /*================
    RATING STARS

   Return the number of stars based on the movie average votes
  ================*/
  const handleStarsNumberFromRating = (rating: number) => {
    return Math.ceil(rating / 2);
  };

  /*================
    GET YEAR

  Parse the date from api response and get the year
  ================*/
  const handleGetYear = (date: string) => {
    const dates = parseISO(date);
    return getYear(dates).toString();
  };

  // Set to true if any query is still loading
  const isLoading = favoriteMoviesResponses.some((query: any) => query.isLoading);

  return (
    <div>
      <div className="breadcrumbs">Home</div>
      <MoviesHeader
        title={"Favorites"}
        handleSearch={(searchValue: string) => handleSearch(searchValue)}
        handleSortChange={(sortValue: SortValueTypes) => handleSortChange(sortValue)}
      />

      {favoriteMoviesIdsList.length != 0 ? (
        isLoading ? (
          <Loader />
        ) : (
          <div className="row">
            {moviesList.map((movie: MovieDetailsApiProps) => {
              return (
                <MovieCard
                  favoriteIcon={<TrashIcon />}
                  movieId={movie.id}
                  key={movie.id}
                  poster={movie.poster_path}
                  title={movie.title}
                  year={handleGetYear(movie.release_date)}
                  language={movie.original_language}
                  genre={movie.genres[0].name}
                  starsNumber={handleStarsNumberFromRating(movie.vote_average)}
                  isInFavorites={true}
                  handleAddToFavorites={handleAddMovieToFavorites}
                />
              );
            })}
          </div>
        )
      ) : (
        <div className="txt--center txt--white">No Results </div>
      )}
    </div>
  );
};
export default Favorites;
