import { MovieGenresProps } from "./interfaces";

const MovieGenres = ({ genres, modifierClass }: MovieGenresProps) => {
  return (
    <>
      {genres.map((genre: Record<string, string | number>) => {
        return (
          <div className={modifierClass} key={genre.id}>
            {genre.name}
          </div>
        );
      })}
    </>
  );
};
export default MovieGenres;
