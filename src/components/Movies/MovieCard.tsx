import { useEffect, useState } from "react";

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
  const handleFavorite = (movieId: number) => {
    setIsFavorite(!isFavorite);
    handleAddToFavorites(movieId);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb--70">
      <div className="movie-card">
        <div className="movie-card__image-box">
          <div className="movie-card__genre">{genre}</div>
          <img className="movie-card__image" src={`https://image.tmdb.org/t/p/w500/${poster}`} />
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
          onClick={() => handleFavorite(movieId)}
        >
          {favoriteIcon}
        </div>
      </div>
    </div>
  );
};
export default MovieCard;