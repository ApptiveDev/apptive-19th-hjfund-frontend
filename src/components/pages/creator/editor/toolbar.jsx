import { useState } from "react";
import { Icon } from "@/components/common/icon";
import Dropdown from "../dropdown";

import styles from "./styles.module.scss";

const Toolbar = () => {
  const [nodeType, setNodeType] = useState("p");
  const [font, setFont] = useState("Pretendard");
  const [fontSize, setFontSize] = useState(15);

  return (
    <div className={styles.toolbar}>
      <Dropdown
        placeholder="스타일"
        value={nodeType}
        onChange={(value) => setNodeType(value)}
      >
        <option value="h1">제목</option>
        <option value="h2">소제목</option>
        <option value="p">본문</option>
      </Dropdown>
      <Dropdown
        placeholder="폰트"
        value={font}
        onChange={(value) => setFont(value)}
      >
        <option value="Pretendard">Pretendard</option>
        <option value="NanumGothic">나눔고딕</option>
        <option value="Nanum Myeongjo">나눔명조</option>
        <option value="NanumBarunGothic">나눔바른고딕</option>
        <option value="NanumSquare">나눔스퀘어</option>
        <option value="MaruBuri-Regular">마루부리</option>
      </Dropdown>
      <Dropdown
        placeholder="크기"
        value={fontSize}
        onChange={(value) => setFontSize(value)}
      >
        <option value={11}>11px</option>
        <option value={13}>13px</option>
        <option value={15}>15px</option>
        <option value={18}>18px</option>
        <option value={19}>19px</option>
        <option value={24}>24px</option>
        <option value={30}>30px</option>
      </Dropdown>
      <div className={styles.divider} />
      <button>
        <Icon name="e-format-bold" size={32} />
      </button>
      <button>
        <Icon name="e-format-italic" size={32} />
      </button>
      <button>
        <Icon name="e-strikethrough" size={32} />
      </button>
      <button>
        <Icon name="e-color-fill" size={32} />
      </button>
      <div className={styles.divider} />
      <button>
        <Icon name="e-add-photo" size={32} />
      </button>
      <button>
        <Icon name="e-link" size={32} />
      </button>
      <button>
        <Icon name="e-file-add" size={32} />
      </button>
      <div className={styles.divider} />
      <button>
        <Icon name="e-list-ordered" size={32} />
      </button>
      <button>
        <Icon name="e-align-left" size={32} />
      </button>
      <button>
        <Icon name="e-height" size={32} />
      </button>
    </div>
  );
};

export default Toolbar;
