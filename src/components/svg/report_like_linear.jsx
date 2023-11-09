export default function ReportLikeLinear({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        stroke={color ?? "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16.002 29l-6.056-6.004-6.008-6.004c-3.25-3.319-3.25-8.512 0-11.83A8.117 8.117 0 019.89 3.03c2.204.118 4.258 1.116 5.67 2.754l.442.418.437-.436c1.413-1.639 3.467-2.636 5.671-2.754a8.117 8.117 0 015.952 2.132c3.25 3.318 3.25 8.511 0 11.83l-6.008 6.004L16.002 29z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}