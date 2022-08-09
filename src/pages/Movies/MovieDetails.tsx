import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";
import handleFetchCall from "../../utils/handleFetchCall";
import handleGetYear from "../../utils/handleGetYear";

// Icons
import { ReactComponent as StarIcon } from "../../assets/images/star.svg";

const MovieDetails = () => {
  // Get movie parameter from path
  const { id } = useParams();

  const { handleFetch } = handleFetchCall();

  // Fetch movie details with id
  const { status: statusMovie, data: movie } = useQuery(["movie", id], () =>
    handleFetch(`${API_ENDPOINT_BASE}/movie/${id}?api_key=${API_KEY}&language=en-US`, "GET"),
  );

  // Fetch actors for movie
  const { status: statusActors, data: actors } = useQuery(["actors", id], () =>
    handleFetch(
      `${API_ENDPOINT_BASE}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
      "GET",
    ),
  );

  // Make an array with number of stars
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    if (!movie || !Object.entries(movie).length) return;
    const starsArray = Array(Math.ceil(movie.vote_average / 2)).fill(1);
    setStars(starsArray);
  }, [movie]);

  // State for show more button
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <div className="row pt--50 mb--100">
      {statusMovie === "success" ? (
        <>
          <div className="col-8">
            <img
              className="movie-details__img"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            />
            <div className="movie-details__info">
              <div className="movie-details__title">{movie.title}</div>
              <div className="movie-details__year">({handleGetYear(movie.release_date)})</div>
              <div className="movie-details__rating">
                {stars.map((_, index: number) => (
                  <StarIcon key={index} />
                ))}
              </div>
            </div>
            <div className="movie-details__summary">{movie.overview}</div>
            {isShowMore && (
              <>
                <div className="movie-details__title pb--20">Plot</div>
                <div className="movie-details__summary"> {movie.overview} </div>
              </>
            )}
            <button className="movie-details__more-btn" onClick={() => setIsShowMore(!isShowMore)}>
              Read More
            </button>
          </div>
          <div className="col-4">
            <div className="movie-details__title2 pb--20">Cast</div>
            <div className="movie-details__cast">
              {statusActors == "success" ? (
                <div className="row">
                  {actors.cast.slice(0, 10).map((actor: any) => {
                    console.log(actor);
                    return (
                      <div className="col-6 pb--20">
                        <img
                          className="movie-details__actor-img"
                          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                        />
                        <div className="movie-details__actor-name">{actor.name}</div>
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
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default MovieDetails;
