"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

export default function Dropdown({ options, onSelect, defaultSelect }) {
  const [view, setView] = useState(false);
  const [order, setOrder] = useState(defaultSelect);
  const dropdownRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setView(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setView(false);
  };

  return (
    <div ref={dropdownRef} className={styles.headerButton}>
      <p>
        <p
          className={styles.buttonText}
          onClick={() => {
            setView(!view);
          }}
        >
          <span>{order}</span>
        </p>

        {view && (
          <ul className={styles.dropdown}>
            {options.map((option, index) => (
              <li
                key={option}
                onClick={() => {
                  handleSelect(option);
                  setOrder(option);
                }}
              >
                {option}
                {index < options.length - 1 && <hr />}
              </li>
            ))}
          </ul>
        )}
      </p>
    </div>
  );
}
