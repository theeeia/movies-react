import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

// Components
import Loader from "../../components/Loader/Loader";
import MovieListItem from "../../components/Movies/MovieListItem";
import MovieCategories from "../../components/Movies/MovieCategories";
import MovieSearchBar from "../../components/Movies/MovieSearchBar";
import Pagination from "../../components/Pagination/Pagination";
import { SortValueTypes } from "../../components/Movies/interfaces";

// Config
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleGetYear from "../../utils/handleGetYear";

// Interfaces
import { MovieApiProps } from "./interfaces";

// Icons
import { ReactComponent as HeartIcon } from "../../assets/images/heart.svg";

// Hooks
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  // Read list from local storage
  let favoriteMoviesIdsList = localStorage.getItem("favoritesList")
    ? JSON.parse(localStorage.getItem("favoritesList") || "")
    : [];
  const { handleFetch } = handleFetchCall();

  const [searchInput, setSearchInput] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("movie");

  // Store the value of the search input

  const handleSearchInput = (value: string) => {
    setSearchInput(value);
  };

  const debouncedSearch = useDebounce(searchInput, 1000) as string;
  // Store the value of the search input
  const handleSearchFilter = (value: string) => {
    setSearchFilter(value);
  };

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

  /*================
    SEARCH QUERY PARAMETERS

   Get query based on filter and search input
  ================*/
  const [searchQuery, setSearchQuery] = useState<string>(
    `${API_ENDPOINT_BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page + 1}`,
  );

  useEffect(() => {
    if (searchFilter === "movie") {
      setSearchQuery(
        `${API_ENDPOINT_BASE}/search/${searchFilter}?api_key=${API_KEY}&language=en-US&query=`,
      );
    } else if (searchFilter === "actor") {
      setSearchQuery(`${API_ENDPOINT_BASE}/search/person?api_key=${API_KEY}&language=en-US&query=`);
    }
  }, [searchFilter]);

  // Get the movies from API at the selected page
  const { status: statusMovies, data: movies } = useQuery(
    [`movies-search`, searchInput],
    () => {
      return handleFetch(`${searchQuery}${debouncedSearch}&page=${page + 1}`, "GET");
    },
    {
      enabled: debouncedSearch != "",
    },
  );

  // Get the genres ids and names from API
  const { status: statusGenres, data: genres } = useQuery(["genres"], () =>
    handleFetch(`${API_ENDPOINT_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`, "GET"),
  );

  // Return a list of genres for the movie
  const handleGetGenreNames = (genre_ids: number[]) => {
    const genresList = genre_ids.map((genre_id: number) => {
      return genres.genres.filter(
        (genre: Record<string, string | number>) => genre.id === genre_id,
      )[0];
    });
    return genresList;
  };

  /*================
    SORT AND FILTER PARAMETERS

  Get the parameters on input change 
  ================*/

  const [sortParameter, setSortFilter] = useState<SortValueTypes | null>(null);

  const [categoryFilterParameters, setCategoryFilterParameters] = useState<string[]>([]);

  // Store the parameter for sorting
  const handleSortChange = (value: SortValueTypes) => {
    setSortFilter(value);
  };

  // Store the parameter for filter by category
  const handleCategoryFilterChange = (categoryList: string[]) => {
    setCategoryFilterParameters(categoryList);
  };

  const moviesList: Record<string, any> = useMemo(() => {
    if (!movies || !Object.entries(movies).length) return [];
    let moviesList = movies.results;
    let moviesData: any[] = [];

    if (searchFilter !== "movie") {
      // Return only actors

      const actors = moviesList.filter((actor: any) => {
        return actor.known_for_department == "Acting";
      });
      // Return  known for movie per actor
      const moviesPerActor = actors.map((moviesPerActor: any) => {
        return [...moviesPerActor.known_for];
      });
      // flatten array
      moviesPerActor.forEach((movie: any) => {
        moviesData = [...moviesData, ...movie];
      });

      console.log(moviesData);
    }

    // Filter movies if there is a input

    // Sort movies if a parameter is selected
    if (sortParameter) {
      moviesList.sort((a: Record<string, any>, b: Record<string, any>) => {
        return b[sortParameter] > a[sortParameter] ? 1 : -1;
      });

      if (sortParameter === "title") return moviesList.reverse();
    }
    if (categoryFilterParameters.length != 0) {
      moviesList = moviesList.filter((movie: any) => {
        return categoryFilterParameters.every((category: string) => {
          return movie.genre_ids.includes(Number(category));
        });
      });
    }
    return moviesList;
  }, [sortParameter, categoryFilterParameters, movies]);

  return (
    <>
      <div className="breadcrumbs">Home</div>

      <div className="row">
        <div className="col-4">
          {statusGenres == "success" && (
            <>
              <h2>Filter Options</h2>
              <MovieCategories
                genres={genres.genres}
                handleCategoryCheck={(categoryList: string[]) =>
                  handleCategoryFilterChange(categoryList)
                }
              />
            </>
          )}
        </div>
        <div className="col-8">
          <h2>Movies</h2>
          <MovieSearchBar
            title="Search"
            handleSearch={(searchValue: string) => handleSearchInput(searchValue)}
            handleSortChange={(sortValue: SortValueTypes) => handleSortChange(sortValue)}
            handleSearchFilter={(searchFitler: string) => handleSearchFilter(searchFitler)}
          />

          {statusMovies === "success" && statusGenres === "success" && searchFilter == "movie" ? (
            <>
              <div className="movie-list">
                {moviesList.map((movie: MovieApiProps) => {
                  return (
                    <MovieListItem
                      favoriteIcon={<HeartIcon />}
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
                      genres={handleGetGenreNames(movie.genre_ids)}
                      plot={movie.overview}
                      votes={movie.vote_average}
                      isInFavorites={favoriteMoviesIdsList.includes(movie.id)}
                      handleAddToFavorites={handleAddMovieToFavorites}
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
              </div>{" "}
            </>
          ) : (
            <div className="txt--center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Search;
