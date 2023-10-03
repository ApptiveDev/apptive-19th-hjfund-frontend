export default function HeaderMainCard({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        fill={color ?? "#000"}
        fillRule="evenodd"
        d="M11.001 20.5L6.69 16.112 2.41 11.725a6.25 6.25 0 010-8.645 5.693 5.693 0 014.238-1.558 5.681 5.681 0 014.04 2.013L11 3.84l.312-.319A5.682 5.682 0 0115.35 1.51a5.693 5.693 0 014.239 1.558 6.25 6.25 0 010 8.645l-4.279 4.387-4.31 4.401z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
