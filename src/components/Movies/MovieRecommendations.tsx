import { useQueries } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Config
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Interfaces
import { MovieDetailsApiProps } from "../../pages/Movies/interfaces";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleGetYear from "../../utils/handleGetYear";

// Components
import Card from "../Card/Card";
import Loader from "../Loader/Loader";

const MovieRecommendations = ({
  recommendedMoviesIdList,
}: {
  recommendedMoviesIdList: number[];
}) => {
  const { handleFetch } = handleFetchCall();
  const navigate = useNavigate();
  /*================
    FETCH recommended MOVIES DETAILS

   Get details for each recommended movie
  ================*/

  // Fetch movie details for every recommended movie in the list
  const recommendedMoviesResponses = useQueries({
    queries: recommendedMoviesIdList.map((movieId: number) => {
      return {
        queryKey: ["recommended-movies", movieId],
        queryFn: () =>
          handleFetch(
            `${API_ENDPOINT_BASE}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
            "GET",
          ),
        enabled: recommendedMoviesIdList.length > 0,
      };
    }),
  });

  // Set to false if all queries are loaded
  const isMovierecommendationDetailsLoading = recommendedMoviesResponses.some(
    (query: Record<string, any>) => query.isLoading,
  );

  return (
    <div>
      <h1 className="mb--70">Recommended For You</h1>

      {recommendedMoviesIdList.length != 0 ? (
        isMovierecommendationDetailsLoading ? (
          <Loader />
        ) : (
          <div className="row mb--50">
            {recommendedMoviesResponses
              .map((movie: Record<string, any>) => movie.data)
              .map((movie: MovieDetailsApiProps) => {
                return (
                  <Card
                    key={movie.id}
                    id={movie.id}
                    imagePath={
                      movie.poster_path
                        ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                        : undefined
                    }
                    title={movie.title}
                    onCardClick={() => navigate("/movies/details/" + movie.id)}
                    subtitle={handleGetYear(movie.release_date)}
                    modifierClass={"card--img-lg col card--clickable"}
                  />
                );
              })}
          </div>
        )
      ) : (
        <div className="mb--30 txt--white txt--center">No recommendations</div>
      )}
    </div>
  );
};
export default MovieRecommendations;
