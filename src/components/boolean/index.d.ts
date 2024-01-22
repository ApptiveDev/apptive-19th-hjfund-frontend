import { ForwardRefExoticComponent, RefAttributes } from "react";

type BooleanType = "checkbox" | "radio";

interface BooleanProps extends React.InputHTMLAttributes<HTMLInputElement> {
  booleanType?: BooleanType;
  booelanBackgroundColor?: string;
  booelanBorderColor?: string;
  booelanIconColor?: string;
  booelanHoverBackgroundColor?: string;
  booelanHoverBorderColor?: string;
  booelanHoverIconColor?: string;
  booelanCheckedBackgroundColor?: string;
  booelanCheckedBorderColor?: string;
  booelanCheckedIconColor?: string;
}

declare const Boolean: ForwardRefExoticComponent<BooleanProps & RefAttributes<HTMLInputElement>>;
export default Boolean;