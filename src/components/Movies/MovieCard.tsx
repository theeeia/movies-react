import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { ReactComponent as StarIcon } from "../../assets/images/star.svg";

// Interfaces
import { MovieCardProps } from "./interfaces";

const MovieCard = ({
  favoriteIcon,
  movieId,
  genre,
  title,
  year,
  language,
  poster,
  starsNumber,
  isInFavorites = false,
  handleAddToFavorites,
}: MovieCardProps) => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  // Create an array with number of stars as length
  useEffect(() => {
    const starsArray = Array(starsNumber).fill(1);
    setStars(starsArray);
  }, []);

  const [isFavorite, setIsFavorite] = useState(isInFavorites);

  // Toogle between favorite classes
  const handleFavorite = (event: any) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    handleAddToFavorites(movieId);
  };

  const navigate = useNavigate();

  const handleMovieDetails = () => {
    navigate("/movies/details/" + movieId);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb--70">
      <div className="movie-card" onClick={() => handleMovieDetails()}>
        <div className="movie-card__image-box">
          {genre && <div className="movie-card__genre">{genre}</div>}

          {poster ? (
            <img className="movie-card__image" src={`https://image.tmdb.org/t/p/w500/${poster}`} />
          ) : (
            <img
              className="movie-card__image"
              src={require("../../assets/images/placeholder.png")}
            />
          )}
        </div>
        <div className="movie-card__details">
          <div className="movie-card__title">{title}</div>
          <div className="movie-card__info">
            <p>{year}</p>
            <p className="txt--uppercase">{language}</p>
          </div>
          <div className="movie-card__rating">
            {stars.map((_, index: number) => (
              <StarIcon key={index} />
            ))}
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
