declare function Tab({
  title,
  active,
  onClick,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
}): JSX.Element;

export default Tab;