// Interfaces
import { CardProps } from "./interfaces";

const Card = ({
  id,
  imagePath,
  title,
  subTitle,
  modifierClass = "",
  onCardClick = undefined,
}: CardProps) => {
  if (imagePath) {
    imagePath = `https://image.tmdb.org/t/p/w500${imagePath}`;
  } else {
    imagePath = require("../../assets/images/placeholder.png");
  }
  return (
    <div className={`pb--20 ${modifierClass}`} key={id}>
      <div onClick={onCardClick} className="card__content">
        <img className="card__image" src={imagePath} />
        <h5 className="card__title">{title}</h5>
        <div className="card__sub-title">{subTitle}</div>
      </div>
    </div>
  );
};
export default Card;
