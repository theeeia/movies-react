import { useQueries } from "@tanstack/react-query";

import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";
import handleFetchCall from "../../utils/handleFetchCall";

const Favorites = () => {
  const favoritesList = localStorage.getItem("favoritesList")
    ? JSON.parse(localStorage.getItem("favoritesList") || "")
    : [];

  const { handleFetch } = handleFetchCall();
  let favoriteMoviesQueries: any = [];
  if (favoritesList.length != 0) {
    favoriteMoviesQueries = useQueries({
      queries: favoritesList.map((movieId: number) => {
        return {
          queryKey: ["favorite-movies", movieId],
          queryFn: () =>
            handleFetch(
              `${API_ENDPOINT_BASE}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
              "GET",
            ),
        };
      }),
    });
  }

  let favoriteMoviesActors: any = [];
  if (favoritesList.length != 0) {
    favoriteMoviesActors = useQueries({
      queries: favoritesList.map((movieId: number) => {
        return {
          queryKey: ["favorite-actors", movieId],
          queryFn: () =>
            handleFetch(
              `${API_ENDPOINT_BASE}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
              "GET",
            ),
        };
      }),
    });
  }

  const isLoading = favoriteMoviesQueries.some((query: any) => query.isLoading);
  const isLoadingActors = favoriteMoviesActors.some((query: any) => query.isLoading);

  if (!isLoading && !isLoadingActors) {
    console.log({ favoriteMoviesQueries });
    console.log({ favoriteMoviesActors });
  }

  return <div>{isLoading}</div>;
};
export default Favorites;
