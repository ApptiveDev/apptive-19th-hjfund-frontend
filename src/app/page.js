import {
  CommentMainCard,
  HeartMainCard,
  HeartMainTitle,
} from "@/components/svg";
import styles from "./styles.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.banner}>
        <div className={styles.contents}>
          <div className={styles.comments}>
            <h1>
              Don't invest in what
              <br />
              you don't understand
            </h1>
            <p>- Warren Buffett -</p>
          </div>
          {/* <div className={styles.recent}>
            <div className={styles.title}>
              <p>최근 리포트</p>
              <p>Recent Reports</p>
            </div>
            <div className={styles.dummy} />
          </div> */}
        </div>
      </section>
      <section className={styles.bests}>
        <div className={styles.title}>
          <HeartMainTitle color="var(--main-color)" />
          <span>인기 리포트</span>
          <span>Best Reports</span>
        </div>
        <div className={styles.cards}>
          {Array.from({ length: 3 }).map((_, i) => (
            <a key={"card-" + i} className={styles.card}>
              <div className={styles.image}>
                <img alt="thumbnail" src="/examples/tesla_main_card.webp" />
              </div>
              <div className={styles.info}>
                <p className={styles.title}>테슬라 리서치 리포트 II</p>
                <div>
                  <p>작성자명</p>
                  <div className={styles.reactions}>
                    <div>
                      <CommentMainCard color="white" />
                      <span>20</span>
                    </div>
                    <div>
                      <HeartMainCard color="white" />
                      <span>22</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className={styles.index}>
        <div className={styles.body}>
          <div className={styles.column}>
            <div className={styles.title}>
              <span>종합</span>
              <span>Generalization</span>
            </div>
            <ul>
              <li className={styles.increasing}>
                <span>코스피</span>
                <span>2550</span>
                <span>▲ 2.47 (-0.43%)</span>
              </li>
              <li className={styles.decreasing}>
                <span>코스닥</span>
                <span>916</span>
                <span>▼ 3.94 (-0.43%)</span>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <div className={styles.title}>
              <span>해외</span>
              <span>Overseas</span>
            </div>
            <ul>
              <li className={styles.increasing}>
                <span>S&P 500</span>
                <span>2550</span>
                <span>▲ 2.47 (-0.43%)</span>
              </li>
              <li className={styles.decreasing}>
                <span>나스닥</span>
                <span>916</span>
                <span>▼ 3.94 (-0.43%)</span>
              </li>
              <li className={styles.decreasing}>
                <span>다우</span>
                <span>916</span>
                <span>▼ 3.94 (-0.43%)</span>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <div className={styles.title}>
              <span>원자재</span>
              <span>Raw Materials</span>
            </div>
            <ul>
              <li className={styles.increasing}>
                <span>WTI</span>
                <span>81.1</span>
                <span>▲ 2.47 (-0.43%)</span>
              </li>
              <li className={styles.decreasing}>
                <span>금</span>
                <span>916</span>
                <span>▼ 3.94 (-0.43%)</span>
              </li>
              <li className={styles.decreasing}>
                <span>달러/원</span>
                <span>1300</span>
                <span>▼ 3.94 (-0.43%)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
