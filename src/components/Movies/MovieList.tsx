const MovieList = ({ movieList }: { movieList: string[] }) => {
  return (
    <ol className="movie-list">
      {movieList.map((movie: string, index: number) => {
        return (
          <li className="" key={movie}>
            {index + 1}. {movie}
          </li>
        );
      })}
    </ol>
  );
};
export default MovieList;
