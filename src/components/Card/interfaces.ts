export interface CardProps {
  id: number;
  imagePath: string | undefined;
  title: string;
  subtitle: string;
  modifierClass?: string;
  onCardClick?: () => void;
}
