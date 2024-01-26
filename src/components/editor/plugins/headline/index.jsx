"use client";

import Button from "@/components/button";
import styles from "./styles.module.scss";
import Icon from "@/components/icon";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { useTickerModal } from "@/components/modal/hooks/ticker";
import { useMetadataContext } from "../../context/metadataContext";

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
  const [metadata, setMetadata] = useMetadataContext();
  const [thumbPreview, setThumbPreview] = useState(undefined);

  const [tickerModalComponent, openTickerModal] = useTickerModal({
    initialCodes: metadata.ticker ? [metadata.ticker] : [],
    multiple: false,
    onConfirm: (codes) =>
      setMetadata((prev) => ({ ...prev, ticker: codes[0] })),
  });

  const uploadThumb = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      setMetadata((prev) => ({ ...prev, thumb: file }));
    };
    input.click();
  }, []);

  useEffect(() => {
    if (metadata.thumb) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbPreview(e.target.result);
      };
      reader.readAsDataURL(metadata.thumb);
    }
  }, [metadata.thumb]);

  return (
    <div ref={ref} className={styles.container}>
      {tickerModalComponent}
      <div className={styles.headline}>
        <div className={styles["thumbnail-handler"]}>
          <TransparentButton>
            <Icon size={16} iconType="upload-circle" />
            <span onClick={() => uploadThumb()}>사진 업로드</span>
          </TransparentButton>
          <TransparentButton>
            <Icon size={16} iconType="star-2" />
            <span>생성</span>
          </TransparentButton>
        </div>
        <div className={styles.title}>
          <TransparentButton onClick={() => openTickerModal()}>
            {metadata.ticker ?? "종목코드 등록"}
          </TransparentButton>
          <h1
            contentEditable
            suppressContentEditableWarning
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            onInput={(e) => {
              setMetadata((prev) => ({
                ...prev,
                title: e.currentTarget?.textContent ?? "",
              }));
            }}
            placeholder="제목을 입력하세요"
          />
        </div>
      </div>
      <div className={styles.image}>
        <div className={styles.filter} />
        <img
          alt="thumbnail"
          src={thumbPreview ?? "/examples/example-thumbnail-1.jpg"}
        />
      </div>
    </div>
  );
});

export default EditorHeadline;
