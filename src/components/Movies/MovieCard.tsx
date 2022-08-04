// Icons
import { ReactComponent as StarIcon } from "../../assets/images/star.svg";
import { ReactComponent as HeartIcon } from "../../assets/images/heart.svg";

// Interfaces
import { MovieCardProps } from "./interfaces";

const MovieCard = ({
  genre,
  title,
  year,
  language,
  poster,
  starsNumber,
  rating,
}: MovieCardProps) => {
  const stars = [];

  for (let i = 0; i < starsNumber; i++) stars.push(<StarIcon key={i} />);
  if (starsNumber % 1 !== 0) {
    stars.pop();
    stars.push(<HeartIcon key={stars.length} />);
  }
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
            <p>{rating}</p>
            <p className="txt--uppercase">{language}</p>
          </div>
          <div className="movie-card__rating">{stars}</div>
        </div>

        <div className="movie-card__favorite">
          <HeartIcon />
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
