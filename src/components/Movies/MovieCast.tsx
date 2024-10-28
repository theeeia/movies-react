import { useQuery } from "@tanstack/react-query";

// Config
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";

// Interface
import { ActorApiProps } from "../../page/Movies/interfaces";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";

// Components
import Loader from "../Loader/Loader";
import Card from "../Card/Card";

const MovieCast = ({ movieId }: { movieId: string }) => {
  const { handleFetch } = handleFetchCall();

  /*================
    FETCH ACTORS

  Fetch list of actors for the movie
  ================*/
  const { status: statusActors, data: actors } = useQuery(["actors", movieId], () =>
    handleFetch(
      `${API_ENDPOINT_BASE}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
      "GET",
    ),
  );

  return (
    <div>
      <h3 className="pb--20 movie-cast__title">Cast</h3>
      <div className="movie-cast">
        {statusActors == "success" && Object.entries(actors).length ? (
          <div className="row">
            {actors?.cast.slice(0, 10).map((actor: ActorApiProps) => {
              return (
                <Card
                  key={actor.id}
                  id={actor.id}
                  imagePath={
                    actor.profile_path
                      ? "https://image.tmdb.org/t/p/w500" + actor.profile_path
                      : undefined
                  }
                  title={actor.name}
                  subtitle={"as " + actor.character}
                  modifierClass={"col-6 col-md-6 col-sm-4 card--img-sm "}
                />
              );
            })}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
export default MovieCast;
