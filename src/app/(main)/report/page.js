import React from "react";
import styles from "./styles.module.scss";
import { ReportPreview } from "./components";

export default function page() {
  return (
    <main>
      <article>
        <header className={styles.header}>
          <section>
            <p className={styles.headerTitle}>리포트</p>
            <div className={styles.buttonLine}>
              <button className={styles.headerButton}>
                <a className={styles.buttonText}>정확도순</a>
                <img
                  className={styles.buttonIcon}
                  src="/images/icon/check.png"
                  alt="checkIcon"
                ></img>
              </button>
            </div>
          </section>
        </header>
        <section className={styles.article}>
          <div className={styles.body}>
            <ReportPreview
              picture="/examples/agf_thumb.png"
              company="디앤씨미디어 (263720)"
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              username="스톡트리"
              likes="20"
              comments="5"
            />
            <ReportPreview
              picture="/examples/agf_thumb2.png"
              company="유니티 소프트웨어"
              title="U: 진정한 가상 현실 수혜 기업을 찾고 있는가"
              username="스톡트리"
              likes="15"
              comments="8"
            />
            <ReportPreview
              picture="/examples/agf_thumb3.png"
              company="엔비디아"
              title="AI 발전의 정점, 엔비디아"
              username="스톡트리"
              likes="4"
              comments="8"
            />
          </div>
          <div className={styles.body}>
            <ReportPreview
              picture="/examples/agf_thumb4.png"
              company="디앤씨미디어 (263720)"
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              username="스톡트리"
              likes="20"
              comments="5"
            />
            <ReportPreview
              picture="/examples/agf_thumb5.png"
              company="디앤씨미디어 (263720)"
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              username="스톡트리"
              likes="20"
              comments="5"
            />
            <ReportPreview
              picture="/examples/agf_thumb6.png"
              company="디앤씨미디어 (263720)"
              title="K-웹툰 OSMU 성공할 수 있을까?️"
              username="스톡트리"
              likes="20"
              comments="5"
            />
          </div>
        </section>
      </article>
    </main>
  );
}
