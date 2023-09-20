import styles from "./style.module.scss";

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
          <div className={styles.recent}>
            <div className={styles.title}>
              <p>최근 리포트</p>
              <p>Recent Reports</p>
            </div>
            <div className={styles.dummy} />
          </div>
        </div>
      </section>
      <section style={{ height: 1000 }} />
    </main>
  );
}
