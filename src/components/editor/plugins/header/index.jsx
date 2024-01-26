import Button from "@/components/button";
import styles from "./styles.module.scss";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react";
import { useImageContext } from "../../context/imageContext";
import { useMetadataContext } from "../../context/metadataContext";

const textWithMode = {
  add: {
    title: "새 리포트",
    button: "리포트 게시",
  },
  edit: {
    title: "리포트 수정",
    button: "수정",
  },
};

const HeaderPlugin = ({ id }) => {
  const [editor] = useLexicalComposerContext();
  
  const mode = id ? "edit" : "add";
  
  const [{ title, ticker, thumb }] = useMetadataContext();
  const { addedImageKeys, removedImageKeys } = useImageContext();

  const handleUpload = useCallback(() => {
    const formData = new FormData();
    const editorStare = editor.getEditorState();
    const serializedState = editorStare.toJSON();

    console.log("BEGIN UPLOAD");
    console.log("SERIALIZED STATE", serializedState);
    console.log("ADDED IMAGES", addedImageKeys);
    console.log("REMOVED IMAGES", removedImageKeys);
  }, [editor, addedImageKeys, removedImageKeys])

  return (
    <div className={styles.container}>
      <p className={styles.title}>{textWithMode[mode]?.title}</p>
      <div className={styles.buttons}>
        {mode === "add" && <p className={styles.save}>변경사항이 저장됨</p>}
        <Button onClick={() => handleUpload()} buttonSize="small">{textWithMode[mode]?.button}</Button>
      </div>
    </div>
  );
};

export default HeaderPlugin;
