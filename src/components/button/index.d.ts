

type ButtonSize = "small" | "medium" | "big";
type ButtonType = "filled" | "outlined";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSize?: ButtonSize;
  buttonType?: ButtonType;
  buttonBackgroundColor?: string;
  buttonBorderColor?: string;
  buttonTextColor?: string;
  buttonHoverBackgroundColor?: string;
  buttonHoverBorderColor?: string;
  ButtonHoverTextColor?: string;
}

declare const Button: React.FC<ButtonProps>;