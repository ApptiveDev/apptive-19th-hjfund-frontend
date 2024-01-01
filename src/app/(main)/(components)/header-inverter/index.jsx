"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import desktopStyles from "../../../../components/header/desktop.module.scss";
import mobileStyles from "../../../../components/header/mobile.module.scss";

const invertRules = [
  (pathname) => pathname === "/",
  (pathname) => pathname.startsWith("/report/"),
];

const HeaderInverter = ({ children }) => {
  const [invert, setInvert] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setInvert(scrollTop <= 0 && invertRules.some((rule) => rule(pathname)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <div
      className={
        invert ? [desktopStyles.invert, mobileStyles.invert].join(" ") : ""
      }
    >
      {children}
    </div>
  );
};

export default HeaderInverter;
