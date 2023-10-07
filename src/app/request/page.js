import styles from "./styles.module.scss";
import { SearchHeader } from "@/components/svg";

export default function Request() {
  return (
    <main className={styles.page}>
      <section className={styles.banner}>
        <section className={styles.contents}>
          <div className={styles.title}>종목요청</div>
          <div className={styles.category}>
            <div className={styles.selectedcategorybox}>
              <span className={styles.number}>1</span>
              <span className={styles.text}>기업선택</span>
            </div>
            <div className={styles.categorybox}>
              <span className={styles.number}>2</span>
              <span className={styles.text}>세부요청</span>
            </div>
            <div className={styles.categorybox}>
              <span className={styles.number}>3</span>
              <span className={styles.text}>결제하기</span>
            </div>
            <div className={styles.categorybox}>
              <span className={styles.number}>4</span>
              <span className={styles.text}>요청완료</span>
            </div>
          </div>
          <div style={{ flex: "1", width: "100%" }}>
            <div className={styles.searchbox}>
              <input
                placeholder="회사명/종목코드를 입력하세요"
                type="search"
              ></input>
              <button>
                <SearchHeader color="var(--text-color)" />
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <span style={{ flex: "1" }} />
            <button className={styles.nextbutton}>다음</button>
          </div>
        </section>
      </section>
    </main>
  );
}
