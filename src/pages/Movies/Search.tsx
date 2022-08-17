import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";

// Components
import Loader from "../../components/Loader/Loader";
import MovieListItem from "../../components/Movies/MovieListItem";
import MovieCategories from "../../components/Movies/MovieCategories";
import MovieSearchBar from "../../components/Movies/MovieSearchBar";
import Pagination from "../../components/Pagination/Pagination";

// Config
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleGetYear from "../../utils/handleGetYear";

// Interfaces
import { MovieApiProps } from "./interfaces";
import { SortOrderTypes, SortValueTypes } from "../../components/Movies/interfaces";

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
    // Reset date range if we input something
    if (value != "") {
      setDateRange({
        startDate: null,
        endDate: null,
      });
      setCategoryFilterParameters([]);
    }
    setSearchInput(value);
  };

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
    SORT AND FILTER PARAMETERS

  Get the parameters on input change 
  ================*/

  const [sortParameter, setSortFilter] = useState<SortValueTypes | null>(null);

  // NOTE: This related to filtering by category
  const [categoryFilterParameters, setCategoryFilterParameters] = useState<string[]>([]);

  const [sortOrder, setSortOrder] = useState<SortOrderTypes>("asc");

  const [dateRange, setDateRange] = useState<Record<string, Date | null>>({
    startDate: null,
    endDate: null,
  });

  // Store the parameter for sorting
  const handleSortChange = (value: SortValueTypes) => {
    setSortFilter(value);
  };

  // Store the sorting order parameter
  const handleSortOrderChange = (value: SortOrderTypes) => {
    setSortOrder(value);
  };

  // Store the parameter for filter by category
  const handleCategoryFilterChange = (categoryList: string[]) => {
    // Reset search input if we select categories when searching movies
    if (searchFilter == "movie") {
      setSearchInput("");
    }
    setCategoryFilterParameters(categoryList);
  };

  // Set the picked start and end date
  const handleDateRangeChange = (dateRange: Date[]) => {
    const [start, end] = dateRange;
    setDateRange({
      startDate: start,
      endDate: end,
    });

    // Reset search input if we select dates when searching movies
    if (searchFilter == "movie") {
      setSearchInput("");
    }
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

  const debouncedSearch = useDebounce(searchInput, 1000) as string;

  // Get actors or directors that match the input
  const { data: people } = useQuery(
    ["people", debouncedSearch, searchFilter],
    () =>
      handleFetch(
        `${API_ENDPOINT_BASE}/search/person?api_key=${API_KEY}&language=en-US&query=${debouncedSearch}`,
        "GET",
      ),
    {
      // Get person if search filter and search input is okay
      enabled: debouncedSearch != "" && ["actor", "director"].includes(searchFilter),
    },
  );

  // Actors or directors id
  const [peopleId, setPeopleId] = useState<string>("");

  // Set in state a list of actors or directors that match the name
  useEffect(() => {
    if (!people || !Object.entries(people).length) return;

    let peopleList = [] as string[];

    peopleList = people.results
      .filter((person: Record<string, any>) => {
        return person.known_for_department === (searchFilter === "actor" ? "Acting" : "Directing");
      })
      .map((person: Record<string, any>) => person.id);

    // Return string of matched ids
    setPeopleId(peopleList.join(","));
  }, [people]);

  // Get the movies from API at the selected page with selected filters
  const { status: statusMovies, data: movies } = useQuery(
    [
      `movies-search`,
      debouncedSearch,
      page + 1,
      peopleId,
      searchFilter,
      dateRange,
      categoryFilterParameters,
    ],
    () => {
      let TYPE: string = "discover/";
      let PARAMS: string = "";

      // if there's a searched value and the filter is set to "title" representing the movie title
      if (debouncedSearch && searchFilter === "movie") {
        TYPE = "search/";
        PARAMS = `&query=${debouncedSearch}`;
      }

      // if there's a searched value and the filter is either by 'actor' or 'director'
      if (debouncedSearch && ["actor", "director"].includes(searchFilter) && peopleId) {
        PARAMS = PARAMS + `&with_people=${peopleId}`;
      }

      // If there is a date selected and the filter is not "movie"
      if (dateRange.startDate != null && dateRange.endDate != null) {
        // Format the dates
        const startDate = format(dateRange.startDate, "yyyy-MM-dd");
        const endDate = format(dateRange.endDate, "yyyy-MM-dd");

        TYPE = "discover/";
        PARAMS =
          PARAMS +
          "&primary_release_date.gte=" +
          startDate +
          "&primary_release_date.lte=" +
          endDate;
      }

      if (categoryFilterParameters.length != 0) {
        PARAMS = PARAMS + "&with_genres=" + categoryFilterParameters.join(",");
      }

      // construct the final URL to be used in the API call
      const URL: string = `${API_ENDPOINT_BASE}/${TYPE}movie?api_key=${API_KEY}${PARAMS}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;

      return handleFetch(`${URL}&page=${page + 1}`, "GET");
    },
    {
      // Prevent sending a request if there is no actor or director found with that input
      enabled: ["movie"].includes(searchFilter) || peopleId != "",
    },
  );

  // Get the genres ids and names from API
  const { status: statusGenres, data: genres } = useQuery(["genres"], () =>
    handleFetch(`${API_ENDPOINT_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`, "GET"),
  );

  // Return a list of genres for the movie
  const handleGetGenreNames = (genre_ids: number[]) => {
    const genresList = genre_ids?.map((genre_id: number) => {
      return genres.genres.filter(
        (genre: Record<string, string | number>) => genre.id === genre_id,
      )[0];
    });
    return genresList;
  };

  const moviesList: Record<string, any> = useMemo(() => {
    if (!movies || !Object.entries(movies).length) return [];
    let moviesList = movies.results;
    // Sort movies if a parameter is selected
    if (sortParameter) {
      moviesList.sort((a: Record<string, any>, b: Record<string, any>) => {
        return b[sortParameter] > a[sortParameter] ? 1 : -1;
      });

      if (sortParameter === "title") moviesList = moviesList.reverse();

      if (sortOrder == "desc") moviesList = moviesList.reverse();
    }

    return moviesList;
  }, [sortParameter, categoryFilterParameters, movies, peopleId, sortOrder]);

  return (
    <>
      <div className="breadcrumbs">Home</div>

      <div className="row">
        <div className="col-4">
          {statusGenres === "success" && (
            <>
              <h2>Filter Options</h2>
              <MovieCategories
                checkedGenres={categoryFilterParameters}
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
            title={"Search by " + searchFilter}
            inputValue={searchInput}
            dateRange={dateRange}
            handleDateRangeChange={(dateRange: Date[]) => handleDateRangeChange(dateRange)}
            handleSearch={(searchValue: string) => handleSearchInput(searchValue)}
            handleSortOrderChange={(sortOrder: SortOrderTypes) => handleSortOrderChange(sortOrder)}
            handleSortChange={(sortValue: SortValueTypes) => handleSortChange(sortValue)}
            handleSearchFilter={(searchFitler: string) => handleSearchFilter(searchFitler)}
          />

          {statusMovies === "success" && statusGenres === "success" ? (
            moviesList.length > 0 ? (
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
                        year={movie.release_date !== "" ? handleGetYear(movie.release_date) : ""}
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
                </div>
              </>
            ) : (
              <div className="txt--center">No Results </div>
            )
          ) : peopleId == "" && searchFilter !== "movie" && debouncedSearch !== "" ? (
            <div className="txt--center">No Results </div>
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
