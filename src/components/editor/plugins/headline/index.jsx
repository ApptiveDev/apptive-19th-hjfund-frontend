"use client";

import Button from "@/components/button";
import styles from "./styles.module.scss";
import Icon from "@/components/icon";
import { forwardRef } from "react";

const TransparentButton = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      buttonStyle="outlined"
      buttonSize="small"
      buttonBackgroundColor="transparent"
      buttonBorderColor="rgba(255, 255, 255, 0.2)"
      buttonTextColor="white"
      buttonHoverBackgroundColor="rgba(255, 255, 255, 0.1)"
      buttonHoverTextColor="white"
      buttonHoverBorderColor="rgba(255, 255, 255, 0.4)"
    >
      {children}
    </Button>
  );
};

const EditorHeadline = forwardRef((_, ref) => {
  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.headline}>
        <div className={styles["thumbnail-handler"]}>
          <TransparentButton>
            <Icon size={16} iconType="upload-circle" />
            <span>사진 업로드</span>
          </TransparentButton>
          <TransparentButton>
            <Icon size={16} iconType="star-2" />
            <span>생성</span>
          </TransparentButton>
        </div>
        <div className={styles.title}>
          <TransparentButton>종목코드 등록</TransparentButton>
          <h1
            contentEditable
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            placeholder="제목을 입력하세요"
          ></h1>
        </div>
      </div>
      <div className={styles.image}>
        <div className={styles.filter} />
        <img alt="thumbnail" src="/examples/example-thumbnail-1.jpg" />
      </div>
    </div>
  );
});

export default EditorHeadline;
