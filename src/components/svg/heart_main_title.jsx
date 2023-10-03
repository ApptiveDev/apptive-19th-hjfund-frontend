export default function HeaderMainTitle({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
      {...props}
    >
      <g clipPath="url(#clip0_611_277)">
        <path
          fill={color ?? "#000"}
          fillRule="evenodd"
          d="M15.002 29.09l-6.265-6.508-6.215-6.507c-3.363-3.597-3.363-9.226 0-12.822A8.172 8.172 0 018.679.943a8.194 8.194 0 015.867 2.985l.456.453.452-.473A8.194 8.194 0 0121.321.923a8.172 8.172 0 016.157 2.31c3.363 3.597 3.363 9.226 0 12.822l-6.215 6.508-6.26 6.527z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_611_277">
          <path fill="#fff" d="M0 0H30V30H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
