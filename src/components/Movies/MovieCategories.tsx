import { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";

const MovieCategories = ({ genres }: { genres: Record<string, any> }) => {
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

  // Add genre to list if its checked or remove if unchecked and update state
  const handleOnChange = (genre: string) => {
    let checkedList = checkedCategories;
    checkedList = checkedCategories.includes(genre)
      ? checkedList.filter((genreName: string) => genreName != genre)
      : [...checkedList, genre];
    setCheckedCategories(checkedList);
  };

  return (
    <div className="movie-categories">
      <div className="movie-categories__title">By Category</div>
      <div className="row movie-categories__list">
        {genres.map((genre: Record<string, any>) => {
          return (
            <div className="col-6" key={genre.id}>
              <Checkbox
                label={genre.name}
                name={genre.name}
                checked={checkedCategories.some((category: string) => category == genre.name)}
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
