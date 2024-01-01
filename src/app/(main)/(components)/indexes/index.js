import styles from "./styles.module.scss";

const examples = [
  {
    title: "종합",
    english: "Composite",
    contents: [
      ["코스피", 2550, 2.47, -0.43],
      ["코스닥", 916, 3.94, 0.58],
    ],
  },
  {
    title: "해외",
    english: "Overseas",
    contents: [
      ["다우존스", 2550, 2.47, -0.43],
      ["나스닥", 916, 3.94, 0.58],
      ["S&P 500", 2550, 2.47, -0.43],
      ["닛케이", 916, 3.94, 0.58],
    ],
  },
  {
    title: "원자재",
    english: "Commodity",
    contents: [
      ["WTI", 2550, 2.47, -0.43],
      ["휘발유", 916, 3.94, 0.58],
      ["금", 2550, 2.47, -0.43],
      ["은", 916, 3.94, 0.58],
    ],
  },
];

const IndexItem = ({ title, english, contents }) => {
  return (
    <div className={styles.item}>
      <div className={styles.title}>
        <span>{title}</span>
        <span>{english}</span>
      </div>
      <div className={styles.contents}>
        {contents.map((item, index) => (
          <div key={index}>
            <span>{item[0]}</span>
            <span>{item[1]}</span>
            <span
              className={styles.rate}
              data-up={item[3] > 0 ? "true" : undefined}
              data-down={item[3] < 0 ? "true" : undefined}
            >
              {item[3] > 0 ? "▲ " : item[3] < 0 ? "▼ " : " "}{item[2]}{" "}({item[3]}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Indexes = () => {
  return (
    <div className={styles.container}>
      <div className={styles.index}>
        {examples.map((example, index) => (
          <IndexItem key={index} {...example} />
        ))}
      </div>
      <div className={styles.background}>
        <div className={styles.filter} />
        <img
          alt="indexes"
          src="/images/bg/index.jpg"
          srcSet="/images/bg/index@2x.jpg 2x, /images/bg/index@3x.jpg 3x"
        />
      </div>
    </div>
  );
};

export default Indexes;
