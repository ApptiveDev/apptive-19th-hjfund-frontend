export default function ArticleLike({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.60704 18.3951L5.59524 14.3136L1.61501 10.2321C-0.538336 7.97638 -0.538336 4.44589 1.61501 2.19016C2.66941 1.18565 4.09755 0.660724 5.55773 0.740964C7.01791 0.821204 8.37876 1.4994 9.31469 2.61328L9.60704 2.89763L9.89663 2.60104C10.8326 1.48715 12.1934 0.80896 13.6536 0.728719C15.1138 0.648479 16.5419 1.17341 17.5963 2.17792C19.7497 4.43365 19.7497 7.96413 17.5963 10.2199L13.6161 14.3014L9.60704 18.3951Z"
        fill={color ?? "#6C6C6C"}
      />
    </svg>
  );
}
