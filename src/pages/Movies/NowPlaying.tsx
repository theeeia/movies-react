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

  // Get the genres ids and names from API
  const { status: statusGenres, data: genres } = useQuery(["genres"], () =>
    handleFetch(`${API_ENDPOINT_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`, "GET"),
  );

  // Get the movies from API
  const { status: statusMovies, data: movies } = useQuery(["movies"], () =>
    handleFetch(
      `${API_ENDPOINT_BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
      "GET",
    ),
  );

  /*================
    RATING STARS

   Return the number of stars based on the movie average votes
  ================*/
  const getStarsNumber = (rating: number) => {
    if (rating > 8) return 5;
    else if (rating <= 8 && rating > 6) return 4;
    else if (rating <= 6 && rating > 4) return 3;
    else if (rating <= 4 && rating > 2) return 2;
    else if (rating <= 2) return 1;
    else return 0;
  };

  /*================
    SEARCH BY NAME

  Send a fetch request to get the user details and fill the input fields
  ================*/
  const [searchInput, setSearchInput] = useState<string | null>(null);

  // Debounce the input to update every second
  const debouncedSearch = useDebounce(searchInput, 1000);

  const handleSearch = (e: any) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">Home</div>
        <MoviesHeader title="Now Playing" handleSearch={(e: any) => handleSearch(e)} />

        {statusGenres === "success" && statusMovies === "success" ? (
          <div className="row mt--30">
            {debouncedSearch != null && debouncedSearch != ""
              ? movies.results
                  .filter((movie: MovieProps) =>
                    movie.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
                  )
                  .map((movie: MovieProps) => {
                    const genre = genres.genres.filter(
                      (genre: GenreProps) => genre.id === movie.genre_ids[0],
                    )[0];

                    return (
                      <MovieCard
                        key={movie.id}
                        poster={movie.poster_path}
                        title={movie.title}
                        year={movie.release_date.split("-")[0]}
                        language={movie.original_language}
                        genre={genre.name}
                        starsNumber={getStarsNumber(movie.vote_average)}
                      />
                    );
                  })
              : movies.results.map((movie: MovieProps) => {
                  const genre = genres.genres.filter(
                    (genre: GenreProps) => genre.id === movie.genre_ids[0],
                  )[0];

                  return (
                    <MovieCard
                      key={movie.id}
                      poster={movie.poster_path}
                      title={movie.title}
                      year={movie.release_date.split("-")[0]}
                      language={movie.original_language}
                      genre={genre.name}
                      starsNumber={getStarsNumber(movie.vote_average)}
                    />
                  );
                })}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
export default NowPlaying;
