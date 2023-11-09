export default function CommentReplyLinear({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="19"
      fill="none"
      viewBox="0 0 18 19"
      {...props}
    >
      <path
        stroke={color ?? "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 9.072c0 3.013 1.619 5.775 4.199 7.164a7.557 7.557 0 008.068-.562l3.307.317V9.07C16.574 4.615 13.088 1 8.787 1 4.487 1 1 4.614 1 9.072z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
