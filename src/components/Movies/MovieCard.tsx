import { ReactComponent as StarIcon } from "../../assets/images/star.svg";
import { ReactComponent as HeartIcon } from "../../assets/images/heart.svg";

function MovieCard(props: any) {
  const { className, genre, title, year, language, length } = props;

  return (
    <div className={className}>
      <div className="movie-card">
        <div className="movie-card__image">
          <div className="movie-card__genre">{genre}</div>
        </div>
        <div className="movie-card__details">
          <div className="movie-card__title">{title}</div>
          <div className="movie-card__info">
            <p>{year}</p>
            <p>{language}</p>
            <p>{length}</p>
          </div>
          <div className="movie-card__rating">
            <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
          </div>
        </div>

        <div className="movie-card__favorite">
          <HeartIcon />
        </div>
      </div>
    </div>
  );
}
export default MovieCard;
