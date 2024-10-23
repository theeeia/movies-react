import { useState } from "react";

// Interfaces
import { MovieListItemProps } from "./interfaces";

// Components
import MovieGenres from "./MovieGenres";
import MovieRatingStars from "./MovieRatingStars";

const MovieListItem = ({
  favoriteIcon,
  movieId,
  genres,
  title,
  year,
  language,
  poster = require("../../assets/images/list-placeholder.png"),
  votes,
  plot,
  isInFavorites = false,
  handleAddToFavorites,
}: MovieListItemProps) => {
  const [isFavorite, setIsFavorite] = useState(isInFavorites);

  // Toogle between favorite classes
  const handleFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    handleAddToFavorites(movieId);
  };
  return (
    <div className="movie-list-item">
      <div className="movie-list-item__image">
        <img src={poster} />
      </div>
      <div className="movie-list-item__details">
        <div className="movie-list-item__row">
          <div className="movie-list-item__title">
            <h5>{title}</h5>
            <div
              className={`movie-list-item__icon ${isFavorite ? "movie-list-item--favorite" : "movie-list-item--not-favorite"
                }  `}
              onClick={event => handleFavorite(event)}
            >
              {favoriteIcon}
            </div>
          </div>
          <div className="movie-list-item__rating">
            <MovieRatingStars votes={votes} />
          </div>
        </div>
        <div className="movie-list-item__row">
          <div className="movie-list-item__year">{year}</div>
          <div className="movie-list-item__language">{language}</div>
        </div>
        <div className="movie-list-item__plot">{plot}</div>
        <div className="movie-list-item__genre">
          <MovieGenres genres={genres} modifierClass={"movie-list-item__genre-item"} />
        </div>
      </div>
    </div>
  );
};
export default MovieListItem;
