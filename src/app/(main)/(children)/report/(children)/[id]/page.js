import { useUserAgent } from "@/tools/user-agent";
import Article from "./(components)/article";
import Floatbar from "./(components)/floatbar";
import Headline from "./(components)/headline";
import styles from "./styles.module.scss";
import Header from "./(components)/header";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const loremIpsum = `형사피고인은 유죄의 판결이 확정될 때까지는 무죄로 추정된다. 농업생산성의 제고와 농지의 합리적인 이용을 위하거나 불가피한 사정으로 발생하는 농지의 임대차와 위탁경영은 법률이 정하는 바에 의하여 인정된다. 국교는 인정되지 아니하며, 종교와 정치는 분리된다. 위원은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다.\n\n
외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 공무원의 신분과 정치적 중립성은 법률이 정하는 바에 의하여 보장된다. 의무교육은 무상으로 한다. 국가는 농업 및 어업을 보호·육성하기 위하여 농·어촌종합개발과 그 지원등 필요한 계획을 수립·시행하여야 한다. 헌법개정안이 제2항의 찬성을 얻은 때에는 헌법개정은 확정되며, 대통령은 즉시 이를 공포하여야 한다.\n\n
국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다. 국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다.\n\n
국군의 조직과 편성은 법률로 정한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는 바에 의하여 보장된다. 제1항의 탄핵소추는 국회재적의원 3분의 1 이상의 발의가 있어야 하며, 그 의결은 국회재적의원 과반수의 찬성이 있어야 한다. 다만, 대통령에 대한 탄핵소추는 국회재적의원 과반수의 발의와 국회재적의원 3분의 2 이상의 찬성이 있어야 한다.\n\n
모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다. 국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다. 국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 법관은 헌법과 법률에 의하여 그 양심에 따라 독립하여 심판한다.\n\n
국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 행정각부의 설치·조직과 직무범위는 법률로 정한다. 학교교육 및 평생교육을 포함한 교육제도와 그 운영, 교육재정 및 교원의 지위에 관한 기본적인 사항은 법률로 정한다.\n\n
국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다. 훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다. 국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다.\n\n
대법원장의 임기는 6년으로 하며, 중임할 수 없다. 대법원장과 대법관이 아닌 법관은 대법관회의의 동의를 얻어 대법원장이 임명한다. 대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다. 나는 헌법을 준수하고 국가를 보위하며 조국의 평화적 통일과 국민의 자유와 복리의 증진 및 민족문화의 창달에 노력하여 대통령으로서의 직책을 성실히 수행할 것을 국민 앞에 엄숙히 선서합니다.`;

export default function ReportViewerPage({}) {
  const { isMobile } = useUserAgent();

  return (
    <main>
      <Header title="K-웹툰 OSMU 성공할 수 있을까? 🙋‍♂️"/>
      <Headline
        title="K-웹툰 OSMU 성공할 수 있을까? 🙋‍♂️"
        itemName="디앤씨미디어"
        itemCode="263720"
        thumbnail="/examples/example-thumbnail-1.jpg"
        date="2024년 1월 4일"
        hearts={72}
        views={21458}
      />
      <div className={classes(styles.layout, conditionalClass(isMobile, styles.mobile))}>
        <Floatbar
          authorProfile="/examples/example-profile-1.jpg"
          authorName="John Doe"
          authorDescription="안녕하세요. 주린이를 위한 성공 투자 가이드, 스톡트리입니다."
        />
        <Article readtime="5분">{loremIpsum + loremIpsum}</Article>
        <div className={styles.counter} />
      </div>
    </main>
  );
}
