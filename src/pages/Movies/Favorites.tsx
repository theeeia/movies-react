import { useQueries } from "@tanstack/react-query";
import { useContext, useEffect, useMemo, useState } from "react";

// Firebase
import db from "../../firebase";
import { doc, updateDoc, deleteField, getDoc } from "firebase/firestore";

// Components
import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/Movies/MovieCard";
import MoviesHeader from "../../components/Movies/MoviesHeader";

// Interfaces
import { SortOrderTypes, SortValueTypes } from "../../components/Movies/interfaces";
import { MovieDetailsApiProps } from "./interfaces";

// Config
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Hooks
import useDebounce from "../../hooks/useDebounce";

// Context
import { AuthContext } from "../../context/AuthContext";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleListFilter from "../../utils/handleListFilter";
import handleGetYear from "../../utils/handleGetYear";

// Icons
import { ReactComponent as TrashIcon } from "../../assets/images/trash.svg";

const Favorites = () => {
  const { user } = useContext(AuthContext);

  const [favoritesIds, setFavoritesIds] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userRef = doc(db, "users", user);
      const docData = await getDoc(userRef);

      if (docData.exists()) {
        setFavoritesIds(Object.keys(docData.data()) ?? []);
      } else {
        setFavoritesIds([])
      }
    };

    fetchFavorites();
  }, []);

  const { handleFetch } = handleFetchCall();

  // Fetch movie details for every movie in the list
  const favoriteMoviesResponses = useQueries({
    queries: favoritesIds
      ? favoritesIds.map((movieId: string) => {
        return {
          queryKey: ["favorite-movies", movieId],
          queryFn: () =>
            handleFetch(
              `${API_ENDPOINT_BASE}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
              "GET",
            ),
          enabled: favoritesIds != null,
        };
      })
      : [],
  });

  /*================
  HANDLE FAVORITE BUTTON 

  Removes the movie from list of favorites
  ================*/
  const handleRemoveMovieFromFavorites = async (movieId: number) => {
    const userRef = doc(db, "users", user);
    await updateDoc(userRef, { [movieId]: deleteField() });

    const docData = await getDoc(userRef);
    if (docData.exists()) {
      setFavoritesIds(Object.keys(docData.data()));
    }
  };

  /*================
    SORT AND FILTER PARAMETERS

  Get the parameters on input change 
  ================*/

  const [searchInput, setSearchInput] = useState<string>("");

  const [sortParameter, setSortFilter] = useState<SortValueTypes | null>(null);

  const [sortOrder, setSortOrder] = useState<SortOrderTypes>("asc");
  // Store the value of the search input
  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  // Store the parameter for sorting
  const handleSortChange = (value: SortValueTypes) => {
    setSortFilter(value);
  };

  // Store the sorting order parameter
  const handleSortOrderChange = (value: SortOrderTypes) => {
    setSortOrder(value);
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
      if (sortParameter === "title") moviesList = moviesList.reverse();

      if (sortOrder == "desc") moviesList = moviesList.reverse();
    }

    return moviesList;
  }, [debouncedSearch, sortParameter, favoriteMoviesResponses, sortOrder]);

  // Set to true if any query is still loading
  const isLoading = favoriteMoviesResponses.some((query: Record<string, any>) => query.isLoading);

  return (
    <div className="mt--20">
      <MoviesHeader
        title={"Favorites"}
        handleSearch={(searchValue: string) => handleSearch(searchValue)}
        handleSortChange={(sortValue: SortValueTypes) => handleSortChange(sortValue)}
        handleSortOrderChange={(sortOrder: SortOrderTypes) => handleSortOrderChange(sortOrder)}
        sortParameter={sortParameter}
      />

      {favoritesIds?.length != 0 ? (
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
                  poster={
                    movie.poster_path
                      ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                      : undefined
                  }
                  title={movie.title}
                  year={movie.release_date != "" ? handleGetYear(movie.release_date) : ""}
                  language={movie.original_language}
                  genre={movie?.genres[0]?.name ?? ""}
                  votes={movie.vote_average}
                  isInFavorites={true}
                  handleAddToFavorites={handleRemoveMovieFromFavorites}
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
