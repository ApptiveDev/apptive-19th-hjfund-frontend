
import Card from "@/components/card";

import styles from "./styles.module.scss";
import { useUserAgent } from "@/tools/user-agent";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const examples = [
  {
    title: "테슬라 리서치 리포트 II",
    thumbnail: "/examples/example-thumbnail-1.jpg",
    date: "5분 전",
    comments: 16,
    hearts: 24,
  },
  {
    title:
      "긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목",
    thumbnail: "/examples/example-thumbnail-2.jpg",
    date: "5분 전",
    comments: 16,
    hearts: 24,
  },
  {
    title: "모든 국민은 사생활의 비밀과 자유를 침해받지 아니한다.",
    thumbnail: "/examples/example-thumbnail-3.jpg",
    date: "5분 전",
    comments: 16,
    hearts: 24,
  },
  {
    title: "통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다.",
    thumbnail: "/examples/example-thumbnail-4.jpg",
    date: "5분 전",
    comments: 16,
    hearts: 24,
  },
  {
    title: "국회는 의장 1인과 부의장 2인을 선출한다.",
    thumbnail: "/examples/example-thumbnail-5.jpg",
    date: "5분 전",
    comments: 16,
    hearts: 24,
  },
  {
    title: "국무총리는 국회의 동의를 얻어 대통령이 임명한다.",
    thumbnail: "/examples/example-thumbnail-6.jpg",
    date: "5분 전",
    comments: 16,
    hearts: 24,
  },
  {
    title: "국회는 의장 1인과 부의장 2인을 선출한다.",
    thumbnail: "/examples/example-thumbnail-7.jpg",
    date: "5분 전",
    comments: 16,
    hearts: 24,
  },
  {
    title: "국무총리는 국회의 동의를 얻어 대통령이 임명한다.",
    thumbnail: "/examples/example-thumbnail-8.jpg",
    date: "5분 전",
    comments: 16,
    hearts: 24,
  },
];

const CardList = () => {
  const { isMobile } = useUserAgent();

  return (
    <div className={styles.container}>
      <div
        className={classes(
          styles["card-list"],
          conditionalClass(isMobile, styles.mobile)
        )}
      >
        {examples.map((example, index) => (
          <Card
            key={index}
            cardType={isMobile ? "list" : "card"}
            title={example.title}
            thumbnail={example.thumbnail}
            date={example.date}
            comments={example.comments}
            hearts={example.hearts}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
