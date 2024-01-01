"use client";

import { Header } from "@/components";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const invertRules = [
  (pathname) => pathname === "/",
  (pathname) => pathname.startsWith("/report/"),
]

const HeaderInverter = () => {
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

  return <Header invert={invert} />;
}

export default HeaderInverter;