import { CalendarMy } from "@/components/svg";
import styles from "./styles.module.scss";

export default function Note() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.status}>
          <p>홍길동 님의 수익률 현황</p>
          <div className={styles.graph} />
          <div className={styles.list}>
            <div className={styles.header}>
              <div>
                <span>1월 수익률</span>
                <span>+14%</span>
                <span>8,590,000원</span>
              </div>
              <button className="my-button">
                <CalendarMy color="white" />
              </button>
            </div>
            <ul className="body">
              {[
                {
                  title: "SK 네트웍스",
                  percent: "+35%",
                  amount: "100,000원",
                },
                {
                  title: "한미반도체",
                  percent: "-6%",
                  amount: "100,000원",
                  minus: true,
                },
                {
                  title: "솔루엠",
                  percent: "+14%",
                  amount: "100,000원",
                },
                {
                  title: "삼성전자",
                  percent: "+5%",
                  amount: "100,000원",
                },
                {
                  title: "삼성전자",
                  percent: "+5%",
                  amount: "100,000원",
                },
              ].map(({ title, percent, amount, minus }) => (
                <li>
                  <span>{title}</span>
                  <span className={minus ? styles.minus : ""}>{percent}</span>
                  <span>{amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.note}>
          <p>투자 아이디어 노트</p>
          <div>
            <input
              type="text"
              className="my-textfield"
              placeholder="제목을 입력해주세요"
            />
            <div>
              <div className="my-textfield" data-placeholder="false">
                날짜를 캘린더에서 선택해주세요
              </div>
              <button className="my-button">
                <CalendarMy color="white" />
              </button>
            </div>
            <textarea
              className="my-textfield"
              placeholder="본문 내용을 입력해주세요"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
