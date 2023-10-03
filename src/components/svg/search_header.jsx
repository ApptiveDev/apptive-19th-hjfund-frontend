export default function SearchHeader({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="none"
      viewBox="0 0 22 22"
      {...props}
    >
      <path
        fill={color ?? "#000"}
        fillRule="evenodd"
        d="M15.488 16.986a8.95 8.95 0 111.437-1.391l3.716 3.752a1 1 0 01-1.42 1.408l-3.733-3.77zm1.436-7.087a7 7 0 11-14 0 7 7 0 0114 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
