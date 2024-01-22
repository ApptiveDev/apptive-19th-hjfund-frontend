interface HeaderProps extends React.HTMLAttributes<HTMLHeaderElement> {
  invert?: boolean;
  absolute?: boolean;
  progress?: boolean;
  progressStart?: number;
  progressEnd?: number;
  progressDesktopOverride?: React.ReactNode;
  progressMobileOverride?: React.ReactNode;
}

declare const Header: React.FC<HeaderProps>;
export default Header;