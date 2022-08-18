import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import MovieRatingStars from "./MovieRatingStars";

// Interfaces
import { MovieCardProps } from "./interfaces";

const MovieCard = ({
  favoriteIcon,
  movieId,
  genre,
  title,
  year,
  language,
  poster = require("../../assets/images/placeholder.png"),
  votes,
  isInFavorites = false,
  handleAddToFavorites,
}: MovieCardProps) => {
  const [isFavorite, setIsFavorite] = useState(isInFavorites);

  // Toogle between favorite classes
  const handleFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    handleAddToFavorites(movieId);
  };

  // Navigate to details page of clicked movie
  const navigate = useNavigate();

  const handleMovieDetails = () => {
    navigate("/movies/details/" + movieId);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb--70">
      <div className="movie-card" onClick={() => handleMovieDetails()}>
        <div className="movie-card__image-box">
          {genre && <div className="movie-card__genre">{genre}</div>}

          <img className="movie-card__image" src={poster} />
        </div>
        <div className="movie-card__details">
          <div className="movie-card__title">{title}</div>
          <div className="movie-card__info">
            <p>{year}</p>
            <p className="txt--uppercase">{language}</p>
          </div>
          <div className="movie-card__rating">
            <MovieRatingStars votes={votes} />
          </div>
        </div>

        <div
          className={`movie-card__favorite ${
            isFavorite ? "movie-card--favorite" : "movie-card--not-favorite"
          }  `}
          onClick={event => handleFavorite(event)}
        >
          {favoriteIcon}
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
