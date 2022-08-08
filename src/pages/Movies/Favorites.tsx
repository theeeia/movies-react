import { useQueries } from "@tanstack/react-query";

import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";
import handleFetchCall from "../../utils/handleFetchCall";

const Favorites = () => {
  // Read list from local storage
  const favoritesList = localStorage.getItem("favoritesList")
    ? JSON.parse(localStorage.getItem("favoritesList") || "")
    : [];

  const { handleFetch } = handleFetchCall();
  let favoriteMoviesQueries: any = [];

  // Get movie details for every movie in the list
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

  // set to true if any query is still loading
  const isLoading = favoriteMoviesQueries.some((query: any) => query.isLoading);

  // Print movies if all are loaded
  if (!isLoading) {
    console.log({ favoriteMoviesQueries });
  }

  return <div>{isLoading}</div>;
};
export default Favorites;
