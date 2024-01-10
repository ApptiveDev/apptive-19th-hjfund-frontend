

type ButtonSize = "small" | "medium" | "big";
type ButtonStyle = "filled" | "outlined";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSize?: ButtonSize;
  buttonStyle?: ButtonStyle;
  buttonBackgroundColor?: string;
  buttonBorderColor?: string;
  buttonTextColor?: string;
  buttonHoverBackgroundColor?: string;
  buttonHoverBorderColor?: string;
  ButtonHoverTextColor?: string;
}

declare const Button: React.FC<ButtonProps>;
export default Button;