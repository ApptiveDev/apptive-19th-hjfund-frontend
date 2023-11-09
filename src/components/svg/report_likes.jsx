export default function ReportLikes({ color, ...props }) {
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
        d="M10.001 18.837L5.99 14.756l-3.98-4.082a5.813 5.813 0 010-8.042 5.296 5.296 0 013.942-1.449c1.46.08 2.821.759 3.757 1.872l.292.285.29-.297a5.285 5.285 0 013.757-1.872 5.296 5.296 0 013.943 1.45 5.813 5.813 0 010 8.041l-3.98 4.081L10 18.837z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
