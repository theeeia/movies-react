// Icons
import { ReactComponent as StarIcon } from "../../assets/images/star.svg";

// Interfaces
import { MovieCardProps } from "./interfaces";
import { useEffect, useRef, useState } from "react";

const MovieCard = ({
  genre,
  title,
  year,
  language,
  poster,
  starsNumber,
  rating,
}: MovieCardProps) => {
  const Icon = ({ fill, handleFavorite }: { fill: string; handleFavorite: (arg: any) => void }) => {
    return (
      <svg
        width="26"
        height="24"
        viewBox="0 0 26 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleFavorite}
      >
        <path
          d="M23.2797 2.2302C21.9339 0.795595 20.138 0.00633577 18.2237 0.00633577C16.3171 0.00633577 14.5337 0.791069 13.2015 2.21662L12.682 2.77417L12.1625 2.21753C10.826 0.787449 9.03849 0 7.12677 0C5.21674 0 3.42582 0.786544 2.08264 2.21753C-0.693286 5.19083 -0.694976 10.0431 2.08264 13.0336L12.0847 23.7357C12.2495 23.9113 12.4657 24 12.682 24C12.8983 24 13.1137 23.9113 13.2793 23.7357L23.283 13.0309C26.0547 10.0468 26.0539 5.20169 23.2797 2.2302ZM21.4862 11.1148C21.3206 11.2922 21.1044 11.3818 20.8873 11.3818C20.6719 11.3818 20.4564 11.294 20.2909 11.1184C19.9606 10.7654 19.9589 10.1934 20.2883 9.83859C21.4017 8.63931 21.4051 6.62091 20.2951 5.43159C19.9648 5.07769 19.9648 4.50566 20.2951 4.15176C20.6254 3.79786 21.1593 3.79786 21.4896 4.15176C23.2459 6.03349 23.2442 9.22311 21.4862 11.1148Z"
          fill={fill}
        />
      </svg>
    );
  };
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (stars.length == 0 && isFirstRun.current) {
      for (let i = 0; i < starsNumber; i++) {
        setStars((stars: React.ReactNode[]) => [...stars, <StarIcon key={i} />]);
      }
      isFirstRun.current = false;
    }
  }, []);

  const [isFavorite, setIsFavorite] = useState<"#2D2D2D" | "#FF055F">("#2D2D2D");

  const handleFavorite = () => {
    if (isFavorite == "#2D2D2D") {
      setIsFavorite("#FF055F");
    } else {
      setIsFavorite("#2D2D2D");
    }
  };

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
          <Icon fill={isFavorite} handleFavorite={handleFavorite} />
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
