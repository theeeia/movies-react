import Favorites from "../pages/Movies/Favorites";
import MovieDetails from "../pages/Movies/MovieDetails";
import NowPlaying from "../pages/Movies/NowPlaying";
import Search from "../pages/Movies/Search";
import TopRated from "../pages/Movies/TopRated";
import Upcoming from "../pages/Movies/Upcoming";
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
