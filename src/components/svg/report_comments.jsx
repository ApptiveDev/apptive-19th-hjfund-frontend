export default function ReportComments({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill={color ?? "#000"}
        fillRule="evenodd"
        d="M1 9.837a8.837 8.837 0 0013.921 7.229l3.753.346V9.837A8.837 8.837 0 009.837 1 8.837 8.837 0 001 9.837z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
