"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Dropdown, Card } from "@/components/pages/report";

const options = ["정확도순", "최신순"];

export default function page() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  return (
    <main>
      <article className={styles.article}>
        <header className={styles.header}>
          <section>
            <p className={styles.headerTitle}>리포트</p>
            <div className={styles.buttonLine}>
              <Dropdown
                options={options}
                onSelect={handleSelect}
                defaultSelect={selectedOption}
              />
            </div>
          </section>
        </header>
        <section className={styles.section}>
          <div className={styles.body}>
            <Card
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              company="디앤씨미디어 (263720)"
              creator="스톡트리"
              comments="5"
              hearts="20"
              thumbnail="/examples/agf_thumb.png"
            />
            <Card
              title="U: 진정한 가상 현실 수혜 기업을 찾고 있는가"
              company="유니티 소프트웨어"
              creator="스톡트리"
              comments="8"
              hearts="15"
              thumbnail="/examples/agf_thumb2.png"
            />
            <Card
              title="AI 발전의 정점, 엔비디아"
              company="엔비디아"
              creator="스톡트리"
              comments="8"
              hearts="4"
              thumbnail="/examples/agf_thumb3.png"
            />
          </div>
          <div className={styles.body}>
            <Card
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              company="디앤씨미디어 (263720)"
              creator="스톡트리"
              comments="5"
              hearts="20"
              thumbnail="/examples/agf_thumb4.png"
            />
            <Card
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              company="디앤씨미디어 (263720)"
              creator="스톡트리"
              comments="5"
              hearts="20"
              thumbnail="/examples/agf_thumb5.png"
            />
            <Card
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              company="디앤씨미디어 (263720)"
              creator="스톡트리"
              comments="5"
              hearts="20"
              thumbnail="/examples/agf_thumb6.png"
            />
          </div>
        </section>
      </article>
    </main>
  );
}
