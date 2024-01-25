

type ButtonSize = "small" | "medium" | "big";
type ButtonStyle = "filled" | "outlined";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonLoading?: boolean;
  buttonSize?: ButtonSize;
  buttonStyle?: ButtonStyle;
  buttonBackgroundColor?: string;
  buttonBorderColor?: string;
  buttonTextColor?: string;
  buttonHoverBackgroundColor?: string;
  buttonHoverBorderColor?: string;
  buttonHoverTextColor?: string;
  buttonLoadingIndicatorColor?: string;
}

declare const Button: React.FC<ButtonProps>;
export default Button;