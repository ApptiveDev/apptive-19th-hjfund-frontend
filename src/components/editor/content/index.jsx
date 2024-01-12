"use client";

import styles from "./styles.module.scss";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import CommandPlugin from "./plugins/command";
import CustomParagraphNode from "./nodes/paragraph";
import { ParagraphNode } from "lexical";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

const onError = (error) => {
  console.error(error);
}

const initialConfig = {
  namespace: "stocktree-editor",
  onError,
  nodes: [
    CustomParagraphNode,
    {
      replace: ParagraphNode,
      with: () => {
        return new CustomParagraphNode();
      },
    },
  ],
};

const EditorContent = () => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <CommandPlugin />
      <div className={styles.container}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.editor} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin />
      </div>
    </LexicalComposer>
  );
};

export default EditorContent;
