import Favorites from "../pages/Movies/Favorites";
import NowPlaying from "../pages/Movies/NowPlaying";
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
];
