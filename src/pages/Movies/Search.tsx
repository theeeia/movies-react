import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Components
import Loader from "../../components/Loader/Loader";
import MovieListItem from "../../components/Movies/MovieListItem";
import MovieCategories from "../../components/Movies/MovieCategories";
import MoviesHeader from "../../components/Movies/MoviesHeader";
import Pagination from "../../components/Pagination/Pagination";
// Config
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleGetYear from "../../utils/handleGetYear";

// Interfaces
import { MovieApiProps } from "./interfaces";

// Icons
import { ReactComponent as HeartIcon } from "../../assets/images/heart.svg";

const Search = () => {
  // Read list from local storage
  let favoriteMoviesIdsList = localStorage.getItem("favoritesList")
    ? JSON.parse(localStorage.getItem("favoritesList") || "")
    : [];
  const { handleFetch } = handleFetchCall();
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

  // Get the movies from API at the selected page
  const { status: statusMovies, data: movies } = useQuery([`movies-search`, page + 1], () => {
    return handleFetch(
      `${API_ENDPOINT_BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page + 1}`,
      "GET",
    );
  });

  // Get the genres ids and names from API
  const { status: statusGenres, data: genres } = useQuery(["genres"], () =>
    handleFetch(`${API_ENDPOINT_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`, "GET"),
  );

  const handleGetGenreNames = (genre_ids: number[]) => {
    const genres_names = genre_ids.map((genre_id: number) => {
      return genres.genres.filter(
        (genre: Record<string, string | number>) => genre.id === genre_id,
      )[0];
    });
    return genres_names;
  };

  return (
    <>
      <div className="breadcrumbs">Home</div>

      <div className="row">
        <div className="col-4">
          <h2>Filter Options</h2>
          <MovieCategories />
        </div>
        <div className="col-8">
          <h2>Movies</h2>
          <MoviesHeader
            title="Search"
            handleSearch={() => {
              console.log("a");
            }}
            handleSortChange={() => {
              console.log("a");
            }}
          />

          {statusMovies === "success" && statusGenres === "success" ? (
            <>
              <div className="movie-list">
                {movies.results.map((movie: MovieApiProps) => {
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
                      year={handleGetYear(movie.release_date)}
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
