export interface CardProps {
  id: number;
  imagePath: string;
  title: string;
  subtitle: string;
  modifierClass?: string;
  onCardClick?: () => void;
}
