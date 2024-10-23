import { useEffect, useState } from "react";

// Icon
import { ReactComponent as StarIcon } from "../../assets/images/star.svg";

const MovieRatingStars = ({ votes }: { votes: number }) => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  // Create an array with number of star elements
  useEffect(() => {
    const starsArray = Array(Math.ceil(votes / 2)).fill(1);
    setStars(starsArray);
  }, []);

  return (
    <>
      {stars.map((_, index: number) => (
        <StarIcon key={index} />
      ))}
    </>
  );
};
export default MovieRatingStars;
