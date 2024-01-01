"use client";

import { useEffect, useState } from "react";
import Icon from "../../../icon";

import styles from "../../styles.module.scss";

const SearchButton = ({ invert, onClick, ...props }) => {
  return (
    <li {...props}>
      <Icon
        className={invert ? styles["icon-invert"] : ""}
        button
        iconType="magnifying-glass"
        onClick={onClick}
      />
    </li>
  );
};

const SearchSheet = ({ setIsOpened }) => {
  return (
    <li className={styles["search-sheet"]} onClick={() => setIsOpened(false)}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles["search-input"]}>
          <input
            type="text"
            name="search"
            placeholder="리포트 제목, 종목 코드 등"
          />
          <Icon button size={18} iconType="magnifying-glass" />
        </div>
        <ul className={styles.recommends}>
          <li>
            <Icon size={18} iconType="circle-clock" />
            <span>안녕하세요</span>
          </li>
        </ul>
      </div>
    </li>
  );
};

const Search = ({ invert }) => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpened])

  return (
    <>
      <SearchButton onClick={() => setIsOpened(true)} invert={invert} />
      {isOpened && <SearchSheet setIsOpened={setIsOpened} />}
    </>
  );
};

export default Search;
