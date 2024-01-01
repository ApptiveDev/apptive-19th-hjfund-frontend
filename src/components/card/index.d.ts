interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  thumbnail?: string;
  title?: string;
  date?: string;
  comments?: number;
  hearts?: number;
}

declare const Card: React.FC<CardProps>;
export default Card;