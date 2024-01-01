import icons from "./assets";

export type IconType = keyof typeof icons;

interface IconProps extends React.SVGAttributes<SVGElement> {
  iconType?: IconType;
  button?: boolean;
  buttonSize?: number;
  size?: number;
}

declare const Icon: React.FC<IconProps>;

export default Icon;