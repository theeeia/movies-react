import MovieRatingStars from "./MovieRatingStars";

const MovieListItem = () => {
  return (
    <div className="movie-list-item">
      <div className="movie-list-item__image">
        <img src={require("../../assets/images/list-placeholder.png")} />
      </div>
      <div className="movie-list-item__details">
        <div className="movie-list-item__row">
          <h5>Title</h5>
          <div className="movie-list-item__icon">icon</div>
        </div>
        <div className="movie-list-item__row">
          <div className="movie-list-item__year">2012</div>
          <div className="movie-list-item__language">LANG</div>
        </div>
        <div className="movie-list-item__plot">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris{" "}
        </div>
        <div className="movie-list-item__genre">GEnre</div>
      </div>
      <div className="movie-list-item__rating">
        <MovieRatingStars votes={10} />
      </div>
    </div>
  );
};
export default MovieListItem;
