import { useQuery } from "@tanstack/react-query";

// Components
import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/Movies/MovieCard";
import MoviesHeader from "../../components/Movies/MoviesHeader";

import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";

function NowPlaying() {
  const { handleFetch } = handleFetchCall();

  const { status: statusGenres, data: genres } = useQuery(["genres"], () =>
    handleFetch(`${API_ENDPOINT_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`, "GET"),
  );
  const { status: statusMovies, data: movies } = useQuery(["movies"], () =>
    handleFetch(
      `${API_ENDPOINT_BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
      "GET",
    ),
  );

  const getStarsNumber = (rating: number) => {
    if (rating > 8) return 5;
    else if (rating <= 8 && rating > 6) return 4;
    else if (rating <= 6 && rating > 4) return 3;
    else if (rating <= 4 && rating > 2) return 2;
    else if (rating <= 2) return 1;
  };

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">Home</div>
        <MoviesHeader title="Now Playing" />

        {statusGenres === "success" && statusMovies === "success" ? (
          <div className="row mt--30">
            {movies.results.map((movie: any) => {
              const genre = genres.genres.filter(
                (genre: any) => genre.id === movie.genre_ids[0],
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
