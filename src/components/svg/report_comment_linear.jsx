export default function ReportCommentLinear({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 28 28"
      {...props}
    >
      <path
        stroke={color ?? "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2 14a12 12 0 0018.903 9.815l5.097.47V14c0-6.628-5.373-12-12-12S2 7.372 2 14z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}