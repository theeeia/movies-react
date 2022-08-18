import { useEffect, useState } from "react";

// Components
import Checkbox from "../Checkbox/Checkbox";

const MovieCategories = ({
  checkedGenres,
  genres,
  handleCategoryCheck,
}: {
  checkedGenres: string[];
  genres: Record<string, any>;
  handleCategoryCheck: (list: string[]) => void;
}) => {
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

  useEffect(() => {
    setCheckedCategories(checkedGenres);
  }, [checkedGenres]);

  // Add genre to list if its checked or remove if unchecked and update state
  const handleOnChange = (genre: string) => {
    let checkedList = checkedGenres;
    checkedList = checkedCategories.includes(genre)
      ? checkedList.filter((genreId: string) => genreId != genre)
      : [...checkedList, genre];
    setCheckedCategories(checkedList);

    handleCategoryCheck(checkedList);
  };

  return (
    <div className="movie-categories">
      <div className="movie-categories__title">By Category</div>
      <div className="row movie-categories__list">
        {genres.map((genre: Record<string, any>) => {
          return (
            <div className="col-6" key={genre.id}>
              <Checkbox
                value={genre.id}
                label={genre.name}
                name={genre.name}
                checked={checkedCategories.some((category: string) => category == genre.id)}
                type="checkbox"
                onChange={handleOnChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MovieCategories;
