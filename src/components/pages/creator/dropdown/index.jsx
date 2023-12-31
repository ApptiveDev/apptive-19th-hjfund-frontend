"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Icon from "./icon";

const Dropdown = ({
  children,
  placeholder = "",
  value,
  onChange,
  style,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(placeholder);
  const [width, setWidth] = useState(0);

  const ref = useRef();
  const sizeRef = useRef();

  useEffect(() => {
    const newCurrent = React.Children.map(children, (child) => {
      if (!child || child.type !== "option") return null;
      if (child.props.value === value) return child.props.children;
    });

    if (!newCurrent) setCurrent(placeholder);
    else setCurrent(newCurrent);
  }, [value]);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      setOpen(false);
    };

    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [open]);

  useLayoutEffect(() => {
    if (sizeRef.current) setWidth(sizeRef.current.offsetWidth);
  }, []);

  return (
    <div
      ref={ref}
      className={[styles.container, className].join(" ")}
      style={{
        width: width + 56,
        ...style,
      }}
      onClick={() => setOpen(!open)}
      data-open={open}
    >
      <span>{current}</span>
      <Icon />
      <ul data-open={open}>
        {React.Children.map(children, (child) => {
          if (!child || child.type !== "option") return null;

          return (
            <li
              key={child.props.value}
              onClick={(e) => {
                e.stopPropagation();
                if (onChange) onChange(child.props.value);
                setOpen(false);
              }}
            >
              {child.props.children}
            </li>
          );
        })}
      </ul>
      <div ref={sizeRef} className={styles.sizer}>
        {React.Children.map(children, (child) => {
          if (!child || child.type !== "option") return null;
          return <span key={child.props.value}>{child.props.children}</span>;
        })}
      </div>
    </div>
  );
};

export default Dropdown;
