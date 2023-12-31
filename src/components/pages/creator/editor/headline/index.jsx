import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

const Headline = ({ headline, company, onChange, children }) => {
  const titleRef = useRef();

  const handleTitleChange = (e) => {
    e.currentTarget.setAttribute("data-empty", !e.currentTarget.textContent);

    if (!e.currentTarget.textContent) e.currentTarget.innerHTML = "<br>";

    if (onChange)
      onChange({
        company,
        headline: e.currentTarget.textContent,
      });
  };

  useEffect(() => {
    handleTitleChange({ currentTarget: titleRef.current });
  }, []);

  return (
    <div className={styles.headline}>
      <h1
        ref={titleRef}
        contentEditable
        placeholder="제목을 입력해주세요."
        onInput={(e) => handleTitleChange(e)}
      >
        {headline}
      </h1>
      <div className={styles.buttons}>
        <button onClick={() => alert("아직 구현되지 않음.")}>
          회사명 &#x2022; 종목 코드를 설정하세요
        </button>
        <div style={{ flex: 1 }} />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};

export default Headline;
