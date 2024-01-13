"use client";

import styles from "./styles.module.scss";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import CommandPlugin from "./plugins/command";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useEffect, useState } from "react";
import PlaceholderPlugin from "./plugins/placeholder";

const onError = (error) => {
  console.error(error);
};

const initialConfig = {
  namespace: "stocktree-editor",
  onError,
  nodes: [],
};

const EditorContent = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    isLoaded && (
      <LexicalComposer initialConfig={initialConfig}>
        <CommandPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.editor} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin />
        <PlaceholderPlugin />
      </LexicalComposer>
    )
  );
};

export default EditorContent;
