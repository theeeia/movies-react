// Components
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import MovieCard from "../../components/Movies/MovieCard";
import MoviesHeader from "../../components/Movies/MoviesHeader";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";
import handleFetchCall from "../../utils/handleFetchCall";

function NowPlaying() {
  const { handleFetch } = handleFetchCall();

  const queryMultiple = () => {
    const genres = useQuery(["genres"], () =>
      handleFetch(`${API_ENDPOINT_BASE}genres/get-movie-list`, "GET"),
    );
    const movies = useQuery(["movies"], () =>
      handleFetch(
        `${API_ENDPOINT_BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
        "GET",
      ),
    );
    return [genres, movies];
  };

  useEffect(() => {
    // if (!data || !Object.entries(data).length) return;
    // // Load the data from the request when it arrives and fill out the form
    // console.log(data);
    // console.log(data.results[0].original_title);
    // console.log(data.results[0].original_language);
    // console.log(data.results[0].release_date);
    // genre, title, year, language, length
  }, [status]);

  return (
    <>
      <NavigationBar />
      <div className="container">
        <div className="breadcrumbs">Home</div>
        <MoviesHeader title="Now Playing" />

        <div className="row">
          <MovieCard className="col-3" />
          <MovieCard className="col-3" />
          <MovieCard className="col-3" />
          <MovieCard className="col-3" />
          <MovieCard className="col-3" />
          <MovieCard className="col-3" />
        </div>
      </div>
    </>
  );
}
export default NowPlaying;
