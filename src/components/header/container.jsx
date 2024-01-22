"use client";

import Logo from "../logo";
import Link from "next/link";
import {
  Request,
  Notification,
  Search,
  UserProfile,
  Menu,
  Progress,
  MobileSearch,
} from "./components";
import desktopStyles from "./desktop.module.scss";
import mobileStyles from "./mobile.module.scss";
import { useEffect, useState } from "react";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const useHeaderScroll = ({
  invert = false,
  progress = false,
  progressStart,
  progressEnd,
}) => {
  const [isInvert, setIsInvert] = useState(invert);
  const [isProgress, setIsProgress] = useState(false);
  const [progressState, setProgressState] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY } = window;

      if (invert) setIsInvert(scrollY <= 0);

      if (progress && progressStart && progressEnd) {
        setIsProgress(scrollY > progressStart);

        const progressState = Math.min(
          1,
          Math.max(0, (scrollY - progressStart) / (progressEnd - progressStart))
        );
        setProgressState(progressState);
      }
    };

    if (invert || progress) {
      handleScroll();
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [invert, progress, progressStart, progressEnd]);

  return {
    isInvert,
    isProgress,
    progressState,
  };
};

export const DesktopHeader = ({
  invert = false,
  absolute = false,
  progress = false,
  progressStart,
  progressEnd,
  progressDesktopOverride,
  className,
  ...props
}) => {
  const { isInvert, isProgress, progressState } = useHeaderScroll({
    invert,
    progress,
    progressStart,
    progressEnd,
  });

  return (
    <header
      className={classes(
        desktopStyles.header,
        conditionalClass(isInvert, desktopStyles.invert),
        conditionalClass(absolute, desktopStyles.absolute),
        className
      )}
      {...props}
    >
      <nav>
        <Link href="/">
          <Logo />
          <h1>StockTree</h1>
        </Link>
        <div>
          <Link href="/report">리포트</Link>
          <Link href="/notes">투자노트</Link>
        </div>
        {progress && progressDesktopOverride && (
          <div
            className={classes(
              desktopStyles.override,
              conditionalClass(isProgress, desktopStyles.enabled)
            )}
          >
            {progressDesktopOverride}
          </div>
        )}
      </nav>
      <ul role="menu">
        <Request />
        <Search />
        <Notification />
        <UserProfile />
      </ul>
      <div className={desktopStyles.progress}>
        <span style={{ width: `${progressState * 100}%` }} />
      </div>
      {progress && <Progress progressState={progressState} />}
    </header>
  );
};

export const MobileHeader = ({
  invert = false,
  absolute = false,
  progress = false,
  progressStart,
  progressEnd,
  progressMobileOverride,
  className,
}) => {
  const { isInvert, isProgress, progressState } = useHeaderScroll({
    invert,
    progress,
    progressStart,
    progressEnd,
  });

  return (
    <header
      className={classes(
        mobileStyles.header,
        conditionalClass(isInvert, mobileStyles.invert),
        conditionalClass(absolute, desktopStyles.absolute),
        className
      )}
    >
      <nav>
        <Link className={mobileStyles.logo} href="/">
          <Logo />
          <h1>StockTree</h1>
        </Link>
      </nav>
      <ul role="menu">
        <MobileSearch />
        <Menu />
      </ul>
      {progress && progressMobileOverride && (
        <div
          className={classes(
            mobileStyles.override,
            conditionalClass(isProgress, mobileStyles.enabled)
          )}
        >
          {progressMobileOverride}
        </div>
      )}
      {progress && <Progress progressState={progressState} />}
    </header>
  );
};
