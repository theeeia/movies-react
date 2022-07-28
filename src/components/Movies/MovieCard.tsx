import { ReactComponent as StarIcon } from "../../assets/images/star.svg";
import { ReactComponent as HeartIcon } from "../../assets/images/heart.svg";

function MovieCard() {
  return (
    <div>
      <div className="movie-card">
        <div className="movie-card__image">
          <div className="movie-card__genre">DRAMA</div>
        </div>
        <div className="movie-card__details">
          <div className="movie-card__title">Terrible Madness</div>
          <div className="movie-card__info">
            <p>2018</p>
            <p>EN</p>
            <p>1hr 2min</p>
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
