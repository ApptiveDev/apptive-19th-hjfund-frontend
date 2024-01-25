
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

declare function Avatar(props: AvatarProps): JSX.Element;
export default Avatar;