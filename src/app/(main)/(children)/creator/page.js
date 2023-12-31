import React from "react";
import styles from "./styles.module.scss";
import CheckboxGreen from "@/components/svg/checkbox_gr";
import { Dropdown, Card } from "./(components)";

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
            <Card
              title="더이상 선택이 아닌 필수가 되어버린 탄소중립"
              company="5년간 성장할 친환경 관련주"
              creator="스톡트리"
              comments="5"
              hearts="20"
              thumbnail="/examples/creator_thumb.png"
            />
            <Card
              title="뭐 적어야할지 모르겠다"
              company="탄소배출권을 누구나 사고 판다고?"
              creator="스톡트리"
              comments="2"
              hearts="2"
              thumbnail="/examples/creator_thumb2.png"
            />
            <Card
              title="AI 발전의 정점, 엔비디아"
              company="엔비디아"
              creator="스톡트리"
              comments="8"
              hearts="4"
              thumbnail="/examples/creator_thumb3.png"
            />
          </div>
          <div className={styles.body}>
            <Card
              title="더이상 선택이 아닌 필수가 되어버린 탄소중립"
              company="5년간 성장할 친환경 관련주"
              creator="스톡트리"
              comments="5"
              hearts="20"
              thumbnail="/examples/creator_thumb.png"
            />
          </div>
        </section>
      </article>
    </main>
  );
}
