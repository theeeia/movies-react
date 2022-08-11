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
import MovieRatingStars from "../../components/Movies/MovieRatingStars";

// Interfaces
import { MovieDetailsApiProps } from "./interfaces";

// Icons
import { ReactComponent as ShowMoreArrowIcon } from "../../assets/images/arrow-more.svg";
import MovieGenres from "../../components/Movies/MovieGenres";

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
  /*================
    FETCH RECOMMENDATIONS

   Get recommended list of movies based on the movie genre
  ================*/

  const [movieGenresIds, setMovieGenresIds] = useState<string>("");

  // Concatenate the genre ids if the movie is loaded

  useEffect(() => {
    if (!movie || !Object.entries(movie).length) return;

    const recommendationsList = movie.genres.map(
      (genre: Record<string, string | number>) => genre.id,
    );
    if (recommendationsList.length != 0) {
      setMovieGenresIds("&with_genres=" + recommendationsList.join(","));
    }
  }, [movie]);

  // Fetch the list of recommendations when movie is loaded
  const { data: recommendedMovies } = useQuery(
    ["recommended", id],
    () =>
      handleFetch(
        `${API_ENDPOINT_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1${movieGenresIds}`,
        "GET",
      ),
    {
      enabled: movieGenresIds !== "",
    },
  );

  const [recommendedMoviesIdList, setRecommendedMoviesIdList] = useState<number[]>([]);

  // Get a list of ids for the first 5 recommendations that dont include the original movie

  useEffect(() => {
    if (!recommendedMovies || !Object.entries(recommendedMovies).length) return;

    const recommendedMoviesIds: number[] = [];
    recommendedMovies.results
      .filter((movie: MovieDetailsApiProps) => movie.id != Number(id))
      .slice(0, 5)
      .map((movie: MovieDetailsApiProps) => recommendedMoviesIds.push(movie.id));

    setRecommendedMoviesIdList(recommendedMoviesIds);
  }, [recommendedMovies]);

  /*================
    REVENUE FORMAT

   Format revenue as currency and set it to state
  ================*/
  const handleConvertToCurrency = (value: number, toCurrency: string) => {
    const valueInCurrency = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: toCurrency,
      maximumSignificantDigits: 9,
    }).format(value);
    setRevenue(valueInCurrency);
  };

  const [revenue, setRevenue] = useState<string>("");

  useEffect(() => {
    if (!movie || !Object.entries(movie).length) return;
    // Convert the movie revenue to dollars
    handleConvertToCurrency(movie.revenue, "USD");
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
                  <MovieRatingStars votes={movie.vote_average} />
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
                  Revenue {movie.revenue == 0 ? "-" : revenue}
                </div>
              </div>
              <div className="movie-details__info">
                <MovieGenres genres={movie.genres} modifierClass={"movie-details__genre mb--10"} />
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
            <div className="col-4">
              <MovieCast movieId={movie.id} />
            </div>
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
