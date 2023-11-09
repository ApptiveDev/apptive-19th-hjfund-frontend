import {
  ReportCommentLinear,
  ReportComments,
  ReportLikeLinear,
  ReportLikes,
  ReportShareLinear,
  ReportViews,
} from "@/components/svg";
import styles from "./styles.module.scss";
import { Comment } from "./components";

export default function ReportViewerPage({}) {
  return (
    <main>
      <article>
        <header className={styles.header}>
          <section>
            <p className={styles.company}>
              <span>리포트</span>
              <span>·</span>
              <span>디앤씨미디어 (263720)</span>
            </p>
            <h1 className={styles.title}>K-웹툰 OSMU 성공할 수 있을까? 🙋‍♂️</h1>
            <footer className={styles.info}>
              <div className={styles.profile}>
                <img src="/examples/profile.jpg" alt="프로필 사진" />
                <div>
                  <p className={styles.username}>
                    <span>스톡트리</span>
                    <span role="img" className={styles.badge} />
                  </p>
                  <time className={styles.date}>2023.10.05</time>
                </div>
              </div>
              <ul className={styles.reactions}>
                <li>
                  <ReportLikes color="var(--passive-text-color)" />
                  <span>4</span>
                </li>
                <li>
                  <ReportComments color="var(--passive-text-color)" />
                  <span>8</span>
                </li>
                <li>
                  <ReportViews color="var(--passive-text-color)" />
                  <span>56</span>
                </li>
              </ul>
            </footer>
          </section>
        </header>
        <section className={styles.body}>
          <figure className={styles.image}>
            <img src="/examples/agf_thumb.png" />
            <figcaption>예시 이미지</figcaption>
          </figure>
          <p>
            글로벌 조회 수 143억회 자랑 ‘나 혼자만 레벨업’ IP 보유 디앤씨미디어
            최원영 대표 취임 후 첫 인터뷰 “슈퍼 IP 확보해 한국의 마블 꿈오디오
            드라마, 내년 상반기 공개” 웹툰을 입은 콘텐츠. 문화사업 시장에서
            통용되는 ‘성공 공식’이다. 검증을 마친 지식재산권(IP)을 활용하고,
            팬덤도 형성된 상태라 사업적 위험도가 낮은 것으로 평가된다. 특히
            영상·게임 분야를 중심으로 웹툰 기반 2차 창작물 제작이 활발하다. 6일
            업계에 따르면 ‘원 소스 멀티 유즈(OSMU)’ 성공 사례가 늘고 있다.
            OSMU는 하나의 소재(원천IP)를 다른 장르에 적용, 파급효과를 노리는
            전략을 말한다.
          </p>
          <br />
          <p>
            원천IP를 유통하는 플랫폼에 맞춰 최적화된 형태로 재구성한다는 특징을
            지닌다. 콘텐츠 기업들은 ‘최소 투자 비용으로 높은 부가가치 창출’을
            기대할 수 있는 전략으로 OSMU를 꼽고, 관련 시장 경쟁력 확보에
            나섰다.OSMU의 핵심은 매력적인 IP에 있다. 웹툰은 이미 시장 가능성에
            대한 검증이 끝난 콘텐츠로, OSMU의 원천IP로 활용되기 충분하다.
            콘텐츠업계 관계자는 “비대면 문화 확산에 따라 콘텐츠 시장이 활성화
            되고 있는데, 성공한 웹툰 스토리를 차용해 재가공 된 상품이 특히
            인기를 끌고 있다”며 “시장에선 ‘잘 짜인 세계관 하나가 기업을 먹여
            살린다’라는 말이 나올 정도”라고 설명했다.
          </p>
          <br />
          <blockquote>출처 : 매일일보(http://www.m-i.kr)</blockquote>
          <div className={styles["react-container"]}>
            <div className={styles.react}>
              <button>
                <ReportLikeLinear color="white" />
              </button>
              <span role="seperator" />
              <button style={{ margin: "10px 0" }}>
                <ReportCommentLinear color="white" />
              </button>
              <span role="seperator" />
              <button>
                <ReportShareLinear color="white" />
              </button>
            </div>
          </div>
        </section>
        <section className={styles["comment-list"]}>
          <header>
            <span>댓글</span>
            <span>1</span>
          </header>
          <Comment
            profile="/examples/default-profile.png"
            username="ApptiveDev"
            date="11월 9일"
            content="좋은 글 매번 감사드립니다"
            likes={2}
          />
          {/* <form>
            <input
              name="comment"
              type="text"
              placeholder="댓글을 작성해보세요."
            />
            <button>등록</button>
          </form> */}
        </section>
      </article>
    </main>
  );
}
