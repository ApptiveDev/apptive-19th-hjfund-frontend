"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import DropdownClosed from "@/components/svg/dropdown_closed";
import DropdownOpened from "@/components/svg/dropdown_opened";

export default function Dropdown() {
  const [view, setView] = useState(false);
  const [order, setOrder] = useState("정확도순");
  return (
    <div className={styles.headerButton}>
      <p>
        <p
          className={styles.buttonText}
          onClick={() => {
            setView(!view);
          }}
        >
          <span>{order}</span>
          <span>{view ? <DropdownClosed /> : <DropdownOpened />}</span>
        </p>

        {view && (
          <ul className={styles.dropdown}>
            <li
              onClick={() => {
                setOrder("정확도순");
                setView(!view);
              }}
            >
              정확도순
            </li>
            <hr />
            <li
              onClick={() => {
                setOrder("최신순");
                setView(!view);
              }}
            >
              최신순
            </li>
          </ul>
        )}
      </p>
    </div>
  );
}
