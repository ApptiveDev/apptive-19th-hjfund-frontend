import Link from "next/link";
import styles from "./styles.module.scss";

export default function Request() {
  return (
    <div className={styles.container}>
      <div className={styles.requestbox}>
        <div className={styles.requestboxheader}>
          <span className={styles.selected}>➊ 종목 선택</span>
          <span>➋ 세부정보 입력</span>
          <span>------------------------------</span>
          <span>➌ 요청 완료</span>
        </div>
        <div className={styles.requestboxbody}>
          <p className={styles.textbox}>
            <span className={styles.boxtitle}>종목 선택</span>
            <span className={styles.boxsubtitle}>
              요청하려는 종목을 입력하세요.
            </span>
          </p>

          <p className={styles.searchbox}>검색창</p>
        </div>
        <div className={styles.requestboxfooter}>
          <button className={styles.tomainbutton}>메인 화면으로</button>
          <Link href="/request/2">
            <button className={styles.nextbutton}>다음</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
