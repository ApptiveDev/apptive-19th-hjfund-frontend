"use client";

import styles from "./styles.module.scss";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import CommandPlugin from "./plugins/command";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useEffect, useRef, useState } from "react";
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

const onError = (error) => {
  console.error(error);
};

const initialConfig = {
  namespace: "stocktree-editor",
  onError,
  nodes: [
    HeadingNode,
    HorizontalRuleNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    LinkNode,
    AutoLinkNode,
  ],
  theme: editorTheme,
};

const Editor = () => {
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

  return (
    isLoaded && (
      <LexicalComposer initialConfig={initialConfig}>
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
