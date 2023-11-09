export default function CommentMoreLinear({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="16"
      fill="none"
      viewBox="0 0 4 16"
      {...props}
    >
      <path
        fill={color ?? "#000"}
        fillRule="evenodd"
        stroke={color ?? "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1.995 3.062c.549 0 .994-.462.994-1.031C2.99 1.461 2.544 1 1.995 1 1.445 1 1 1.462 1 2.031c0 .273.105.536.291.729.187.193.44.302.704.302zM1.995 8.98c.549 0 .994-.462.994-1.03 0-.57-.445-1.032-.994-1.032-.55 0-.995.462-.995 1.031 0 .57.445 1.031.995 1.031zM1.995 14.898c.549 0 .994-.461.994-1.03 0-.57-.445-1.032-.994-1.032-.55 0-.995.462-.995 1.031 0 .57.445 1.031.995 1.031z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}