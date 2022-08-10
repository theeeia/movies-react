import { useQueries, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";

// Config
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleGetYear from "../../utils/handleGetYear";

// Components
import Loader from "../../components/Loader/Loader";

// Interfaces
import { ActorApiProps, MovieDetailsApiProps } from "./interfaces";

// Icons
import { ReactComponent as StarIcon } from "../../assets/images/star.svg";
import { ReactComponent as ShowMoreArrowIcon } from "../../assets/images/arrow-more.svg";

const MovieDetails = () => {
  // Get movie parameter from path
  const { id } = useParams();

  const navigate = useNavigate();

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
    FETCH ACTORS

  Fetch list of actors for movie
  ================*/
  const { status: statusActors, data: actors } = useQuery(
    ["actors", id],
    () =>
      handleFetch(
        `${API_ENDPOINT_BASE}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
        "GET",
      ),
    {
      enabled: !!movieLoaded,
    },
  );

  /*================
    FETCH RECOMENDATIONS

   Get recomended list of movies based on the movie genre
  ================*/
  let recomendationGenresIds: string = "";
  // Concatenate the genre ids if the movie is loaded
  if (movieLoaded) {
    movie.genres.map(
      (genre: Record<string, string | number>) =>
        (recomendationGenresIds = recomendationGenresIds.concat("&with_genres=" + genre.id)),
    );
  }

  // Fetch the list of recomendations
  const { status: statusRecomendedMovies, data: recomendedMovies } = useQuery(
    ["recomended", id],
    () =>
      handleFetch(
        `${API_ENDPOINT_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1${recomendationGenresIds}`,
        "GET",
      ),
    {
      enabled: !!movieLoaded,
    },
  );

  const recomendedMoviesIdList: number[] = [];
  // Get a list of ids for the first 5 recomendations
  if (statusRecomendedMovies == "success") {
    recomendedMovies.results
      .filter((movie: MovieDetailsApiProps) => movie.id != Number(id))
      .slice(0, 5)
      .map((movie: MovieDetailsApiProps) => recomendedMoviesIdList.push(movie.id));
  }

  /*================
    FETCH RECOMENDED MOVIES DETAILS

   Get details for each recomended movie
  ================*/

  // Fetch movie details for every recomended movie in the list
  const recomendedMoviesResponses = useQueries({
    queries: recomendedMoviesIdList.map((movieId: number) => {
      return {
        queryKey: ["recomended-movies", movieId],
        queryFn: () =>
          handleFetch(
            `${API_ENDPOINT_BASE}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
            "GET",
          ),
        enabled: recomendedMoviesIdList.length > 0,
      };
    }),
  });

  // Set to false if all queries are loaded

  const isMovieRecomendationDetailsLoading = recomendedMoviesResponses.some(
    (query: any) => query.isLoading,
  );

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
            <div className="col-4">
              <h3 className="pb--20">Cast</h3>
              <div className="movie-details__cast">
                {statusActors == "success" && Object.entries(actors).length ? (
                  <div className="row">
                    {actors?.cast.slice(0, 10).map((actor: ActorApiProps) => {
                      return (
                        <div className="col-6 pb--20" key={actor.id}>
                          {actor.profile_path ? (
                            <img
                              className="movie-details__actor-img"
                              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                            />
                          ) : (
                            <img
                              className="movie-details__actor-img"
                              src={require("../../assets/images/placeholder.png")}
                            />
                          )}

                          <h5 className="movie-details__actor-name">{actor.name}</h5>
                          <div className="movie-details__role-name">as {actor.character}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
          <div>
            <h1 className="mb--70">Recomended For You</h1>
            <div className="recomendations mb--100">
              {recomendedMoviesIdList.length != 0 ? (
                isMovieRecomendationDetailsLoading ? (
                  <>
                    {isMovieRecomendationDetailsLoading}
                    <Loader />
                  </>
                ) : (
                  recomendedMoviesResponses
                    .map((movie: Record<string, any>) => movie.data)
                    .map((movie: MovieDetailsApiProps) => {
                      return (
                        <div
                          className="recomendations__card"
                          onClick={() => navigate("/movies/details/" + movie.id)}
                          key={movie.id}
                        >
                          <img
                            className="recomendations__image mb--20"
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          />
                          <div className="recomendations__title">{movie.title}</div>
                          <div className="recomendations__year">
                            {handleGetYear(movie.release_date)}
                          </div>
                        </div>
                      );
                    })
                )
              ) : (
                "No recomendations"
              )}
            </div>
          </div>
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
