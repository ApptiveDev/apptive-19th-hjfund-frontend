"use client";

import Icon from "@/components/icon";
import { reportScrollProgressState } from "@/store/report";
import { useRecoilState } from "recoil";
import { DesktopHeader, MobileHeader } from "@/components/header/container";

import styles from "./styles.module.scss";

const ProgressDesktopOverride = ({ title }) => (
  <p className={styles.desktop}>{title}</p>
);

const ProgressMobileOverride = () => (
  <div className={styles.mobile}>
    <div role="menu" className={styles.left}>
      <Icon button iconType="share-link" />
      <Icon button iconType="heart" />
    </div>
    <div role="menu" className={styles.right}>
      <Icon button iconType="text-style" />
    </div>
  </div>
);

export const DesktopHeaderWrapper = ({ title }) => {
  const [state] = useRecoilState(reportScrollProgressState);

  return (
    <DesktopHeader
      invert
      progress
      progressStart={state.start}
      progressEnd={state.end}
      progressDesktopOverride={<ProgressDesktopOverride title={title} />}
    />
  );
};

export const MobileHeaderWrapper = () => {
  const [state] = useRecoilState(reportScrollProgressState);

  return (
    <MobileHeader
      invert
      progress
      progressStart={state.start}
      progressEnd={state.end}
      progressMobileOverride={<ProgressMobileOverride />}
    />
  );
};
