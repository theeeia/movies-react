import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";
import handleFetchCall from "../../utils/handleFetchCall";

const MovieDetails = () => {
  const { id } = useParams();
  const { handleFetch } = handleFetchCall();
  const { status: status, data: movie } = useQuery(["movie", id], () =>
    handleFetch(`${API_ENDPOINT_BASE}/movie/${id}?api_key=${API_KEY}&language=en-US`, "GET"),
  );
  console.log(movie);

  return (
    <div>
      {status === "success" ? (
        <div className="row">
          <div className="col-8">
            <img
              className="movie-details__img"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            />
          </div>
          <div className="col-4">a</div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default MovieDetails;
