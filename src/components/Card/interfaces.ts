export interface CardProps {
  id: number;
  imagePath: string;
  title: string;
  subTitle: string;
  modifierClass?: string;
  onCardClick?: () => void;
}
