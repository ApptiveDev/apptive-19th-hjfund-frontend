import { useState } from "react";
import styles from "./styles.module.scss";
import Tab from "@/components/tab";
import Button from "@/components/button";
import Modal from "@/components/modal";
import { handleUpload } from "./tools";

function ImageFileModal({ editor, id, onClose }) {
  function uploadAction() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = false;

    async function handleFileChange(e) {
      const file = e.currentTarget.files[0];
      if (!file) return;
  
      await handleUpload(editor, id, file).catch(() => {});
      onClose();
      fileInput.removeEventListener("change", handleFileChange);
    }

    fileInput.addEventListener("change", handleFileChange);
    fileInput.click();
  }

  return (
    <div className={styles.tabbody}>
      <div className={styles.body}>
        <Button className={styles.localupload} onClick={() => uploadAction()}>
          파일 업로드
        </Button>
      </div>
      <footer>
        <div style={{ flex: 1 }} />
        <Button
          buttonSize="small"
          buttonStyle="outlined"
          onClick={() => onClose()}
        >
          취소
        </Button>
      </footer>
    </div>
  );
}

function ImageURLModal() {
  return <div className={styles.body}>현재 지원되지 않음</div>;
}

function ImageUnsplashModal() {
  return <div className={styles.body}>현재 지원되지 않음</div>;
}

export default function ImageModal({ isOpen, editor, id, onClose }) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Modal className={styles.modal} isOpen={isOpen} onClose={onClose}>
      <header>
        <h2>사진 업로드</h2>
        <div className={styles.tabs}>
          {["파일", "링크", "Unsplash"].map((title, index) => (
            <Tab
              key={index}
              title={title}
              active={index === tabIndex}
              onClick={() => setTabIndex(index)}
            />
          ))}
        </div>
      </header>
      {
        [
          <ImageFileModal editor={editor} id={id} onClose={onClose} />,
          <ImageURLModal />,
          <ImageUnsplashModal />,
        ][tabIndex]
      }
    </Modal>
  );
}
