import { ForwardRefExoticComponent, RefAttributes } from "react";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  radioBackgroundColor?: string;
  radioBorderColor?: string;
  radioIconColor?: string;
  radioHoverBackgroundColor?: string;
  radioHoverBorderColor?: string;
  radioHoverIconColor?: string;
  radioCheckedBackgroundColor?: string;
  radioCheckedBorderColor?: string;
  radioCheckedIconColor?: string;
}

declare const Radio: ForwardRefExoticComponent<RadioProps & RefAttributes<HTMLInputElement>>;
export default Radio;
