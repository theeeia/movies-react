import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
  const [page, setPage] = useState(1);

  // Get the genres ids and names from API
  const { status: statusGenres, data: genres } = useQuery(["genres"], () =>
    handleFetch(`${API_ENDPOINT_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`, "GET"),
  );

  // Get the movies from API
  const {
    status: statusMovies,
    data: movies,
    isPreviousData: isPreviousData,
  } = useQuery(["movies", page], () =>
    handleFetch(
      `${API_ENDPOINT_BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`,
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
    if (sortFilter === "title") {
      movieList.sort((a: MovieProps, b: MovieProps) => (a.title > b.title ? 1 : -1));
    }
    if (sortFilter === "newest") {
      movieList.sort((a: any, b: any) => {
        a = a.release_date;
        b = b.release_date;
        return a < b ? 1 : a > b ? -1 : 0;
      });
    }
    if (sortFilter === "popular") {
      movieList.sort((a: any, b: any) => {
        a = a.vote_average;
        b = b.vote_average;
        return b - a;
      });
    }

    // return original if no parameter is chosen
    return movieList;
  };

  /*================
    SORT AND FILTER PARAMETERS

  Get the parameters on input change 
  ================*/
  const [searchInput, setSearchInput] = useState<string | null>(null);

  const [sortFilter, setSortFilter] = useState<"title" | "newest" | "popular" | null>(null);

  // Debounce the input to update every second
  const debouncedSearch = useDebounce(searchInput, 1000);

  const handleSearch = (e: any) => {
    setSearchInput(e.target.value);
  };
  const handleFilterChange = (value: any) => {
    setSortFilter(value);
  };

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">Home</div>
        <MoviesHeader
          title="Now Playing"
          handleSearch={(e: any) => handleSearch(e)}
          handleFilterChange={(e: any) => handleFilterChange(e)}
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
            <div>
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
