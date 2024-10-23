import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT_BASE, API_KEY } from "../../config/config";
import handleFetchCall from "../../utils/handleFetchCall";
import { useEffect, useState } from "react";
import MovieList from "../../components/Movies/MovieList";
import MovieChart from "../../components/Movies/MovieChart";
import Loader from "../../components/Loader/Loader";

const Statistics = () => {
  const { handleFetch } = handleFetchCall();
  const { status: statusPopularMovies, data: popularMovies } = useQuery(["popularMovies"], () =>
    handleFetch(
      `${API_ENDPOINT_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`,
      "GET",
    ),
  );

  const { status: statusMostRevenueMovies, data: mostRevenueMovies } = useQuery(
    ["mostRevenueMovies"],
    () =>
      handleFetch(
        `${API_ENDPOINT_BASE}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=revenue.desc`,
        "GET",
      ),
  );

  if (statusPopularMovies === "success") {
    console.log(popularMovies);
  }
  if (statusMostRevenueMovies === "success") {
    console.log(mostRevenueMovies);
  }

  const [popularMovieData, setPopularMovieData] = useState<any>([]);
  const [popularMovieNames, setPopularMovieNames] = useState<any[]>([]);
  useEffect(() => {
    if (!popularMovies || !Object.entries(popularMovies).length) return;
    let popularDataList = [] as string[];
    let popularMovieNames = [] as number[];
    popularDataList = popularMovies.results.slice(0, 10).map((movie: any) => {
      return { data: [movie.revenue, movie.revenue], name: movie.title, type: "bar" };
    });
    popularMovieNames = popularMovies.results.slice(0, 10).map((movie: any) => {
      return movie.title;
    });

    setPopularMovieData(popularDataList);
    setPopularMovieNames(popularMovieNames);
  }, [statusPopularMovies]);
  console.log(statusPopularMovies);

  const [revenueMovieNames, setRevenueMovieNames] = useState<any>([]);
  const [revenueMovieData, setRevenueMovieData] = useState<any[]>([]);

  useEffect(() => {
    if (!mostRevenueMovies || !Object.entries(mostRevenueMovies).length) return;
    let revenueMoviesNames = [] as string[];
    let mostRevenueList = [] as number[];
    mostRevenueList = mostRevenueMovies.results.slice(0, 10).map((movie: any) => {
      return { y: movie.popularity, name: movie.title };
    });
    revenueMoviesNames = mostRevenueMovies.results.slice(0, 10).map((movie: any) => {
      return movie.title;
    });

    setRevenueMovieNames(revenueMoviesNames);
    setRevenueMovieData(mostRevenueList);
  }, [statusPopularMovies]);

  return (
    <div>
      <div className="statistics__header">
        <h4>Statistics</h4>
      </div>

      <div className="row">
        <div className="col-8">
          {statusPopularMovies === "success" ? (
            <MovieChart
              chartData={popularMovieData}
              chartNames={popularMovieNames}
              chartTitle="popularity"
              chartType="bar"
            />
          ) : (
            <Loader />
          )}
        </div>
        <div className="col-4">
          <MovieList movieList={popularMovieNames} />
        </div>

        <div className="col-8">
          {statusMostRevenueMovies === "success" ? (
            <MovieChart
              chartData={revenueMovieData}
              chartNames={revenueMovieNames}
              chartTitle="revenue"
              chartType="column"
            />
          ) : (
            <Loader />
          )}
        </div>
        <div className="col-4">
          <MovieList movieList={revenueMovieNames} />
        </div>
      </div>
    </div>
  );
};
export default Statistics;
