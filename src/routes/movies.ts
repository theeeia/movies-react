import Favorites from "../page/Movies/Favorites";
import MovieDetails from "../page/Movies/MovieDetails";
import NowPlaying from "../page/Movies/NowPlaying";
import Search from "../page/Movies/Search";
import TopRated from "../page/Movies/TopRated";
import Upcoming from "../page/Movies/Upcoming";
import { RoutesProps } from "./interfaces";

export const MOVIE_ROUTES: RoutesProps[] = [
  {
    path: "/movies/now-playing",
    component: NowPlaying,
  },
  {
    path: "/movies/upcoming",
    component: Upcoming,
  },
  {
    path: "/movies/top-rated",
    component: TopRated,
  },
  {
    path: "/movies/favorites",
    component: Favorites,
  },
  {
    path: "/movies/details/:id",
    component: MovieDetails,
  },
  {
    path: "/movies/search",
    component: Search,
  },
];
