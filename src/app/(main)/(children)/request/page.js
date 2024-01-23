import Link from "next/link";
import styles from "./styles.module.scss";
// import { searchIcon } from "../../../../public/images/icon/search.png";
import { Search } from "@/components/header/components";
import Icon from "@/components/icon";

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
          <span className={styles.textbox}>
            <span className={styles.boxtitle}>종목 선택</span>
            <span className={styles.boxsubtitle}>
              요청하려는 종목을 입력하세요.
            </span>
          </span>
          <span className={styles.searchbox}>
            <input
              className={styles.searchbox_input}
              type="text"
              placeholder="종목 코드 검색"
            />
            <Icon
              className={styles["button-invert-icon"]}
              button
              iconType="magnifying-glass"
              // onClick={() => console.log("search")}
            />
          </span>
        </div>
        <div className={styles.requestboxfooter}>
          <Link href="/">
            <button className={styles.tomainbutton}>메인 화면으로</button>
          </Link>
          <Link href="/request/2">
            <button className={styles.nextbutton}>다음</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
