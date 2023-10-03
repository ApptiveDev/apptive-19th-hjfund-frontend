export default function ArrowMainCardlist({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="44"
      fill="none"
      viewBox="0 0 24 44"
      {...props}
    >
      <path
        fill={color ?? "#000"}
        fillRule="evenodd"
        d="M22.56 42.114a1.5 1.5 0 00.002-2.121L4.618 22 22.562 4.007a1.5 1.5 0 10-2.124-2.118l-19 19.052a1.5 1.5 0 000 2.118l19 19.052a1.5 1.5 0 002.121.003z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
