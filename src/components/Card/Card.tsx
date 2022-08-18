// Interfaces
import { CardProps } from "./interfaces";

const Card = ({
  id,
  imagePath = require("../../assets/images/placeholder.png"),
  title,
  subtitle,
  modifierClass = "",
  onCardClick = undefined,
}: CardProps) => {
  return (
    <div className={`card ${modifierClass}`} key={id}>
      <div onClick={onCardClick} className="card__content">
        <img className="card__image" src={imagePath} />
        <h5 className="card__title">{title}</h5>
        <div className="card__sub-title">{subtitle}</div>
      </div>
    </div>
  );
};
export default Card;
