import { atom } from "recoil";

export interface HeaderProps {
  invert?: boolean
  progress?: boolean
  progressStart?: number
  progressEnd?: number
  progressDesktopOverride?: JSX.Element
  progressMobileOverride?: JSX.Element
}

export declare const defaultHeaderProps: HeaderProps;
export declare const headerProps: atom<HeaderProps>;