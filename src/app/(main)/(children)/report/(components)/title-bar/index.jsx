import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";
import styles from "./styles.module.scss";
import { useUserAgent } from "@/tools/user-agent";
import React, { useState } from "react";

const Title = () => {
  const [selected, setSelected] = useState("newest");

  const handleCategoryClick = (value) => {
    setSelected(value);
  };

  return (
    <div className={classes(styles.title)}>
      <h1>모든 리포트</h1>
      <span
        onClick={() => handleCategoryClick("newest")}
        className={[
          styles.category,
          selected === "newsest" ? styles.selected : "",
        ].join(" ")}
      >
        최신순
      </span>
      <span
        onClick={() => handleCategoryClick("hotest")}
        className={[
          styles.category,
          selected === "hotest" ? styles.selected : "",
        ].join(" ")}
      >
        인기순
      </span>
    </div>
  );
};

const Search = () => {
  const { isMobile } = useUserAgent();

  return <div className={classes(styles.search)}>searchBar</div>;
};

const TitleBar = () => {
  return (
    <>
      <Title />
      <Search />
    </>
  );
};

export default TitleBar;
