// Interfaces
import { CardProps } from "./interfaces";

const Card = ({ id, imagePath, title, subTitle, modifierClass = "", clickFn }: CardProps) => {
  return (
    <div className={`pb--20 ${modifierClass}`} key={id}>
      <div onClick={clickFn ? clickFn : undefined} className="card__content">
        {imagePath ? (
          <img className="card__image" src={`https://image.tmdb.org/t/p/w500/${imagePath}`} />
        ) : (
          <img className="card__image" src={require("../../assets/images/placeholder.png")} />
        )}

        <h5 className="card__title">{title}</h5>
        <div className="card__sub-title">{subTitle}</div>
      </div>
    </div>
  );
};
export default Card;
