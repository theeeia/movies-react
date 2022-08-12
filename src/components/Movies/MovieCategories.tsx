const MovieCategories = ({ genres }: { genres: Record<string, any> }) => {
  return (
    <div className="movie-categories">
      <div className="movie-categories__title">By Category</div>
      <div className="row movie-categories__list">
        {genres.map((genre: Record<string, any>) => {
          return (
            <div className="col-6">
              <input
                type="checkbox"
                key={genre.id}
                name={genre.name}
                className="movie-categories__item"
              />
              <label className="movie-categories__item">{genre.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MovieCategories;
