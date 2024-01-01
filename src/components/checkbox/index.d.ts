import { ForwardRefExoticComponent } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checkboxBackgroundColor?: string;
  checkboxBorderColor?: string;
  checkboxIconColor?: string;
  checkboxHoverBackgroundColor?: string;
  checkboxHoverBorderColor?: string;
  checkboxHoverIconColor?: string;
  checkboxCheckedBackgroundColor?: string;
  checkboxCheckedBorderColor?: string;
  checkboxCheckedIconColor?: string;
}

declare const Checkbox: ForwardRefExoticComponent<CheckboxProps>;
export default Checkbox;