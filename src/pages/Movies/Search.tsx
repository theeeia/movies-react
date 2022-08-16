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

  const [categoryFilterParameters, setCategoryFilterParameters] = useState<string[]>([]);

  // Store the parameter for sorting
  const handleSortChange = (value: SortValueTypes) => {
    setSortFilter(value);
  };

  // Store the parameter for filter by category
  const handleCategoryFilterChange = (categoryList: string[]) => {
    setCategoryFilterParameters(categoryList);
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
  // const [searchQuery, setSearchQuery] = useState<string>(
  //   `${API_ENDPOINT_BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US`,
  // );

  const debouncedSearch = useDebounce(searchInput, 1000) as string;

  // Get actors that match the input
  const { data: people } = useQuery(
    ["people", debouncedSearch, searchFilter],
    () =>
      handleFetch(
        `${API_ENDPOINT_BASE}/search/person?api_key=${API_KEY}&language=en-US&query=${debouncedSearch}`,
        "GET",
      ),
    {
      // Get person if search filter and search input is okay
      enabled: (searchFilter == "actor" || searchFilter == "director") && debouncedSearch != "",
    },
  );

  // Actors or directors id
  const [peopleId, setPeopleId] = useState<string>("");

  // Set in state a list of actors or directors that match the name
  useEffect(() => {
    if (!people || !Object.entries(people).length) return;

    let peopleList = [] as string[];

    if (searchFilter == "actor") {
      peopleList = people.results
        .filter((person: Record<string, any>) => {
          return person.known_for_department == "Acting";
        })
        .map((person: Record<string, any>) => person.id);
    }
    if (searchFilter == "director") {
      peopleList = people.results
        .filter((person: Record<string, any>) => {
          return person.known_for_department == "Directing";
        })
        .map((person: Record<string, any>) => person.id);
    }

    // Return string of matched ids
    if (peopleList.length != 0) {
      setPeopleId(peopleList.join(","));
    } else {
      // If no results, set it to empty
      setPeopleId("");
    }
  }, [people]);

  // set search query based on filter and search input
  // reset page on every new search
  // useEffect(() => {
  //   switch (true) {
  //     // Get default now_playing movie list
  //     case debouncedSearch == "":
  //       setPage(0);
  //       setSearchQuery(`${API_ENDPOINT_BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US`);
  //       break;

  //     // Get movie list with input in the title
  //     case debouncedSearch != "" && searchFilter == "movie":
  //       setPage(0);
  //       setSearchQuery(
  //         `${API_ENDPOINT_BASE}/search/movie?api_key=${API_KEY}&language=en-US&query=${debouncedSearch}`,
  //       );
  //       break;

  //     // Get movie list with actor from input
  //     case debouncedSearch != "" && peopleId != "":
  //       setPage(0);
  //       setSearchQuery(
  //         `${API_ENDPOINT_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&with_people=${peopleId}`,
  //       );
  //       break;
  //   }
  // }, [searchFilter, debouncedSearch, peopleId]);

  // Get the movies from API at the selected page
  const { status: statusMovies, data: movies } = useQuery(
    [`movies-search`, debouncedSearch, page + 1, peopleId, searchFilter, categoryFilterParameters],
    () => {
      let searchQuery = `${API_ENDPOINT_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;

      if (debouncedSearch === "") {
        searchQuery = `${API_ENDPOINT_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false${
          categoryFilterParameters.length != 0 &&
          "&with_genres=" + categoryFilterParameters.join(",")
        }`;
      } else {
        if (searchFilter == "movie") {
          searchQuery = `${API_ENDPOINT_BASE}/search/movie?api_key=${API_KEY}&language=en-US&query=${debouncedSearch}`;
        } else if (peopleId != "") {
          searchQuery = `${API_ENDPOINT_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&with_people=${peopleId}`;
        }
      }

      return handleFetch(`${searchQuery}&page=${page + 1}`, "GET");
    },
    {
      // Prevent getting movies if there is no actor or director with input
      // da ne se prakjat voopshto povik do filmoj ako ne e najden akter ili direktor
      enabled: searchFilter == "movie" || peopleId != "",
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
    }

    // Filter by category if not input
    // If we get movies by input they will aready be filtered with query parameters
    if (categoryFilterParameters.length != 0 && debouncedSearch != "") {
      moviesList = moviesList.filter((movie: any) => {
        return categoryFilterParameters.every((category: string) => {
          return movie.genre_ids.includes(Number(category));
        });
      });
    }

    return moviesList;
  }, [sortParameter, categoryFilterParameters, movies, peopleId]);

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
            title={"Search by " + searchFilter}
            handleSearch={(searchValue: string) => handleSearchInput(searchValue)}
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
                </div>
              </>
            ) : (
              <div className="txt--center">No Results </div>
            )
          ) : peopleId != "" && searchFilter != "movie" && debouncedSearch != "" ? (
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
