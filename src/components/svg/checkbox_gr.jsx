export default function CheckboxGreen({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
    >
      <circle cx="15" cy="15" r="15" fill="#2E7B5A" />
      <path
        stroke="#fff"
        stroke-linecap="square"
        stroke-linejoin="round"
        stroke-width="4"
        d="m7.857 15.625 4.762 4.592 9.524-9.184"
      />
    </svg>
  );
}
