"use client";

import styles from "./styles.module.scss";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import CommandPlugin from "./plugins/command";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useEffect, useMemo, useRef, useState } from "react";
import PlaceholderPlugin from "./plugins/placeholder";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import EditorHeadline from "./plugins/headline";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import ShortcutPlugin from "./plugins/shortcut";
import FloatingPlugin from "./plugins/floating";
import LinkHoverPlugin from "./plugins/link/hover";
import LinkPlugin from "./plugins/link";
import editorTheme from "./theme";
import DebugPlugin from "./plugins/debug";
import LinkEditPlugin from "./plugins/link/edit";
import HeaderPlugin from "./plugins/header";
import { ImagePlugin } from "./plugins/image";
import { ImageNode } from "./nodes/image";

const onError = (error) => {
  console.error(error);
};

const initialConfig = {
  onError,
  nodes: [
    HeadingNode,
    HorizontalRuleNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    LinkNode,
    AutoLinkNode,
    ImageNode,
  ],
  theme: editorTheme,
};

const Editor = ({ editable, id, editorState }) => {
  if (!editable && !editorState) {
    console.error("invalid arguments");
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [headlineHeight, setHeadlineHeight] = useState(0);

  const headlineRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const height = entries[0].target.clientHeight;
      setHeadlineHeight(height);
    });

    if (headlineRef.current) {
      observer.observe(headlineRef.current);
    }

    return () => {
      observer.disconnect();
    };
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const namespace = useMemo(
    () => (editable ? (id ? `edit-${id}` : "add") : "view"),
    [editable, id]
  );

  return (
    isLoaded && (
      <LexicalComposer
        initialConfig={{
          ...initialConfig,
          namespace: namespace,
          editorState,
          editable,
        }}
      >
        {editable && <HeaderPlugin id={id} />}
        <div className={styles.modal}>
          <ImagePlugin id={namespace} />
        </div>
        <div className={styles.layer}>
          <FloatingPlugin />
          <LinkHoverPlugin />
          <LinkEditPlugin />
        </div>
        <div className={styles.container}>
          <EditorHeadline ref={headlineRef} />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={styles.editor}
                spellCheck={false}
                style={{
                  "--headline-height": headlineHeight + "px",
                }}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <CommandPlugin />
          <HistoryPlugin />
          <OnChangePlugin />
          <PlaceholderPlugin />
          <TabIndentationPlugin />
          <ShortcutPlugin />
          <ListPlugin />
          <LinkPlugin />
          {process.env.NODE_ENV === "development" && <DebugPlugin />}
        </div>
      </LexicalComposer>
    )
  );
};

export default Editor;
