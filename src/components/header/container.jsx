"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import desktopStyles from "./desktop.module.scss";
import mobileStyles from "./mobile.module.scss";

const invertRules = [
  (pathname) => pathname === "/",
  (pathname) => pathname.startsWith("/report/"),
];

const HeaderContainer = ({ children }) => {
  const [invert, setInvert] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setInvert(scrollTop <= 0 && invertRules.some((rule) => rule(pathname)));
    };

    // check mobile with user-agent
    const userAgent = window.navigator.userAgent;
    setIsMobile(/Mobile/.test(userAgent));

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <div
      className={[
        isMobile ? mobileStyles.root : desktopStyles.root,
        invert ? [mobileStyles.invert, desktopStyles.invert].join(" ") : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default HeaderContainer;
