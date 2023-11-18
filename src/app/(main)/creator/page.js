import React from "react";
import styles from "./styles.module.scss";
import { ReportPreview } from "./components";
import CheckboxGreen from "@/components/svg/checkbox_gr";

export default function page() {
  return (
    <main>
      <article className={styles.article}>
        <header className={styles.header}>
          <section>
            <p>
              <img
                className={styles.profilePic}
                src="/examples/profile.jpg"
                alt="profile_image"
              />
            </p>
            <p className={styles.creator}>
              <p className={styles.creatorName}>
                스톡트리&nbsp;
                <CheckboxGreen />
              </p>
              <p className={styles.describe}>
                안녕하세요 주린이를 위한 성공투자가이드, 스톡트리입니다.
                <br />
                Hello, I'm Stocktree, a successful investment guide for stock
                beginners.
              </p>
            </p>
          </section>
        </header>
        <section className={styles.section}>
          <div className={styles.body}>
            <ReportPreview
              picture="/examples/creator_thumb.png"
              company="5년간 성장할 친환경 관련주"
              title="더이상 선택이 아닌 필수가 되어버린 탄소중립"
              creator="스톡트리"
              likes="20"
              comments="5"
            />
            <ReportPreview
              picture="/examples/creator_thumb2.png"
              company="탄소배출권을 누구나 사고 판다고?"
              title="뭐 적어야할지 모르겠다"
              creator="스톡트리"
              likes="2"
              comments="2"
            />
            <ReportPreview
              picture="/examples/creator_thumb3.png"
              company="엔비디아"
              title="AI 발전의 정점, 엔비디아"
              creator="스톡트리"
              likes="4"
              comments="8"
            />
          </div>
          <div className={styles.body}>
            <ReportPreview
              picture="/examples/creator_thumb.png"
              company="5년간 성장할 친환경 관련주"
              title="더이상 선택이 아닌 필수가 되어버린 탄소중립"
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
