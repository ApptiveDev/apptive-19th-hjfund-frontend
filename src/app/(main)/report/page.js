"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Dropdown, ReportPreview } from "./components";

export default function page() {
  const [view, setView] = useState(false);
  return (
    <main>
      <article className={styles.article}>
        <header className={styles.header}>
          <section>
            <p className={styles.headerTitle}>리포트</p>
            <div className={styles.buttonLine}>
              <p className={styles.headerButton}>
                <ul
                  onClick={() => {
                    setView(!view);
                  }}
                >
                  <p className={styles.buttonText}>
                    정확도순{" "}
                    {view ? (
                      <img
                        className={styles.buttonIcon}
                        src="/images/icon/arrow1.png"
                      />
                    ) : (
                      <img
                        className={styles.buttonIcon}
                        src="/images/icon/arrow1.png"
                      />
                    )}
                  </p>

                  {view && <Dropdown />}
                </ul>
              </p>
            </div>
          </section>
        </header>
        <section className={styles.section}>
          <div className={styles.body}>
            <ReportPreview
              picture="/examples/agf_thumb.png"
              company="디앤씨미디어 (263720)"
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              creator="스톡트리"
              likes="20"
              comments="5"
            />
            <ReportPreview
              picture="/examples/agf_thumb2.png"
              company="유니티 소프트웨어"
              title="U: 진정한 가상 현실 수혜 기업을 찾고 있는가"
              creator="스톡트리"
              likes="15"
              comments="8"
            />
            <ReportPreview
              picture="/examples/agf_thumb3.png"
              company="엔비디아"
              title="AI 발전의 정점, 엔비디아"
              creator="스톡트리"
              likes="4"
              comments="8"
            />
          </div>
          <div className={styles.body}>
            <ReportPreview
              picture="/examples/agf_thumb4.png"
              company="디앤씨미디어 (263720)"
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              creator="스톡트리"
              likes="20"
              comments="5"
            />
            <ReportPreview
              picture="/examples/agf_thumb5.png"
              company="디앤씨미디어 (263720)"
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              creator="스톡트리"
              likes="20"
              comments="5"
            />
            <ReportPreview
              picture="/examples/agf_thumb6.png"
              company="디앤씨미디어 (263720)"
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              creator="스톡트리"
              likes="20"
              comments="5"
            />
          </div>
        </section>
      </article>
    </main>
  );
}
