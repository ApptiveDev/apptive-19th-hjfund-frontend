import Link from "next/link";
import styles from "./styles.module.scss";
import { BellHeader, UserHeader, SearchHeader } from "@/components/svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>웹사이트이름</h1>
        <nav className={styles.nav}>
          <div className={styles.dropdown}>
            <div>콘텐츠</div>
            <ul>
              <li><Link href="/reports">리포트</Link></li>
              <li><Link href="/knowledge">재무지식</Link></li>
              <li><Link href="/beginners">For Beginner</Link></li>
            </ul>
          </div>
          <div className={styles.dropdown}>
            <Link href="request">종목요청</Link>
          </div>
        </nav>
      </div>
      <div className={styles.right}>
        <div className={styles.search}>
          <input type="text" placeholder="검색" />
          <div>
            <button><SearchHeader color="var(--text-color)" /></button>
          </div>
        </div>
        <div className={styles.tools}>
          <div className={styles.dropdown}>
              <UserHeader color="var(--text-color)" />
              <ul>
                <li><Link href="/login">로그인</Link></li>
                <li><Link href="/my">마이페이지</Link></li>
                <li><Link href="/scraps">스크랩</Link></li>
            </ul>
          </div>
          <div className={[styles.dropdown, styles.notifications].join(" ")}>
            <div><BellHeader color="var(--text-color)" /></div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;