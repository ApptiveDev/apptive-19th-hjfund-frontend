export default function CommentMainCard({ color }) {
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
        d="M1.5 11a9.5 9.5 0 0014.965 7.77l4.035.372V11A9.5 9.5 0 0011 1.5 9.5 9.5 0 001.5 11z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
