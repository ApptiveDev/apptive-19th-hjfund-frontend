import { classes } from "@/tools/classes";
import styles from "./styles.module.scss";
import { useUserAgent } from "@/tools/user-agent";
import React from "react";
import Icon from "@/components/icon";

const Title = () => {
  // const [selected, setSelected] = useState("newest");

  // const handleCategoryClick = (value) => {
  //   setSelected(value);
  // };

  return (
    <div className={classes(styles.title)}>
      <h1>모든 리포트</h1>
      <span
        // onClick={() => handleCategoryClick("newest")}
        className={[
          styles.category,
          // selected === "newsest" ?
          styles.selected,
          // : "",
        ].join(" ")}
      >
        최신순
      </span>
      <span
        // onClick={() => handleCategoryClick("hotest")}
        className={[
          styles.category,
          // selected === "hotest" ? styles.selected : "",
        ].join(" ")}
      >
        인기순
      </span>
    </div>
  );
};

const Search = () => {
  const { isMobile } = useUserAgent();

  return (
    <span className={styles.searchbox}>
      <input
        className={styles.searchbox_input}
        type="text"
        placeholder="종목 코드 검색"
      />
      <Icon
        className={styles["button-invert-icon"]}
        button
        iconType="magnifying-glass"
        // onClick={() => console.log("search")}
      />
    </span>
  );
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
