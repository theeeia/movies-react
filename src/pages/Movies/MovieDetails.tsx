import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";

// Config
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleGetYear from "../../utils/handleGetYear";

// Components
import Loader from "../../components/Loader/Loader";
import MovieCast from "../../components/Movies/MovieCast";
import MovieRecommendations from "../../components/Movies/MovieRecommendations";

// Interfaces
import { MovieDetailsApiProps } from "./interfaces";

// Icons
import { ReactComponent as StarIcon } from "../../assets/images/star.svg";
import { ReactComponent as ShowMoreArrowIcon } from "../../assets/images/arrow-more.svg";

const MovieDetails = () => {
  // Get movie parameter from path
  const { id } = useParams();

  const { handleFetch } = handleFetchCall();

  /*================
    FETCH MOVIE DETAILS

  Fetch the details of the movie
  ================*/
  const { status: statusMovie, data: movie } = useQuery(["movie", id], () =>
    handleFetch(`${API_ENDPOINT_BASE}/movie/${id}?api_key=${API_KEY}&language=en-US`, "GET"),
  );

  // Check if movie is loaded
  const movieLoaded = movie?.id;

  /*================
    FETCH RECOMMENDATIONS

   Get recommended list of movies based on the movie genre
  ================*/
  let recommendationGenresIds: string = "";
  // Concatenate the genre ids if the movie is loaded
  if (movieLoaded) {
    movie.genres.map(
      (genre: Record<string, string | number>) =>
        (recommendationGenresIds = recommendationGenresIds.concat("&with_genres=" + genre.id)),
    );
  }

  // Fetch the list of recommendations when movie is loaded
  const { status: statusrecommendedMovies, data: recommendedMovies } = useQuery(
    ["recommended", id],
    () =>
      handleFetch(
        `${API_ENDPOINT_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1${recommendationGenresIds}`,
        "GET",
      ),
    {
      enabled: !!movieLoaded,
    },
  );

  const recommendedMoviesIdList: number[] = [];

  // Get a list of ids for the first 5 recommendations that dont include the original movie
  if (statusrecommendedMovies == "success") {
    recommendedMovies.results
      .filter((movie: MovieDetailsApiProps) => movie.id != Number(id))
      .slice(0, 5)
      .map((movie: MovieDetailsApiProps) => recommendedMoviesIdList.push(movie.id));
  }

  /*================
    RATING STARS

   Return the number of stars based on the movie average votes
  ================*/
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    if (!movie || !Object.entries(movie).length) return;
    const starsArray = Array(Math.ceil(movie.vote_average / 2)).fill(1);
    setStars(starsArray);
  }, [movie]);

  // State for show more button
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <>
      {movie && statusMovie === "success" ? (
        <>
          <div className="row pt--50 mb--100">
            <div className="col-8">
              {movie.backdrop_path ? (
                <img
                  className="movie-details__img"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                />
              ) : (
                <img
                  className="movie-details__img"
                  src={require("../../assets/images/poster-placeholder.png")}
                />
              )}

              <div className="movie-details__info">
                <h2 className="movie-details__title">{movie.title}</h2>
                <div className="movie-details__year">({handleGetYear(movie.release_date)})</div>
                <div className="movie-details__rating">
                  {stars.map((_, index: number) => (
                    <StarIcon key={index} />
                  ))}
                </div>
              </div>
              <div className="movie-details__info">
                <div className="movie-details__label mr--30">{movie.runtime}min</div>
                <div className="movie-details__label mr--30">
                  {movie.status == "Released" ? (
                    <>Published on {format(parseISO(movie.release_date), "PPP")}</>
                  ) : (
                    <>Will publish on {format(parseISO(movie.release_date), "PPP")}</>
                  )}
                </div>
                <div className="movie-details__label">Status: {movie.status}</div>

                <div className="movie-details__label movie-details__revenue">
                  Revenue{" "}
                  {movie.revenue == 0
                    ? "-"
                    : Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumSignificantDigits: 9,
                      }).format(movie.revenue)}
                </div>
              </div>
              <div className="movie-details__info">
                {movie.genres.map((genre: Record<string, string | number>) => {
                  return (
                    <div className="movie-details__genre txt--uppercase mb--10" key={genre.id}>
                      {genre.name}
                    </div>
                  );
                })}
              </div>
              <div className="movie-details__summary">{movie.overview}</div>
              {isShowMore && (
                <>
                  <h2 className="movie-details__title pb--20">Plot</h2>
                  <div className="movie-details__summary"> {movie.overview} </div>
                </>
              )}
              {movie.revenue ? (
                <button
                  className="movie-details__more-btn"
                  onClick={() => setIsShowMore(!isShowMore)}
                >
                  {isShowMore ? (
                    <div className="movie-details__more-label movie-details__flip-icon">
                      Read Less <ShowMoreArrowIcon />
                    </div>
                  ) : (
                    <div className="movie-details__more-label">
                      Read More <ShowMoreArrowIcon />
                    </div>
                  )}
                </button>
              ) : null}
            </div>
            <div className="col-4">{movieLoaded && <MovieCast movieId={movie.id} />}</div>
          </div>
          <MovieRecommendations recommendedMoviesIdList={recommendedMoviesIdList} />
        </>
      ) : (
        <div className="txt--center">
          <Loader />
        </div>
      )}
    </>
  );
};
export default MovieDetails;
