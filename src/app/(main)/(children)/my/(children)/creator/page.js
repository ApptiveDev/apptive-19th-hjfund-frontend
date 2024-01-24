import Header from "@/components/header";
import styles from "./styles.module.scss";
import Navigation from "../../(components)/navigation";
import Button from "@/components/button";
import { useUserAgent } from "@/tools/user-agent";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

export default function CreatorPage() {
  const { isMobile } = useUserAgent();

  return (
    <main className={styles.main}>
      <Header absolute />
      <Navigation isMobile={isMobile} />
      <div
        className={classes(
          styles.body,
          conditionalClass(isMobile, styles.mobile)
        )}
      >
        <img
          src="/images/illustration/undraw_investor_update_re_qnuu.svg"
          alt="크리에이터 신청하기"
        />
        <h1>크리에이터 신청하기</h1>
        <p>
          제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다.
          국가는 지역간의 균형있는 발전을 위하여 지역경제를 육성할 의무를 진다.
          비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한 간첩죄의
          경우와 초병·초소·유독음식물공급·포로에 관한 죄중 법률이 정한 경우에
          한하여 단심으로 할 수 있다.
        </p>
        <Button>신청하기</Button>
      </div>
    </main>
  );
}
