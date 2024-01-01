type TextfieldSize = "small" | "medium";

interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  textfieldSize?: TextfieldSize;
  textfieldLeft?: React.ReactNode;
  textfieldRight?: React.ReactNode;
  textfieldBackgroundColor?: string;
  textfieldBorderColor?: string;
  textfieldTextColor?: string;
  textfieldHoverBackgroundColor?: string;
  textfieldHoverBorderColor?: string;
  textfieldHoverTextColor?: string;
  textfieldFocusBackgroundColor?: string;
  textfieldFocusBorderColor?: string;
  textfieldFocusTextColor?: string;
}

declare const Textfield: React.FC<TextfieldProps>;
export default Textfield;