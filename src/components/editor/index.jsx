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
import { useSharedHistoryContext } from "./context/sharedHistoryContext";
import { CustomHeadingNode } from "./nodes/heading";
import { getEditorState } from "./tools/saveEditorState";
import AutoSavePlugin from "./plugins/autosave";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const onError = (error) => {
  console.error(error);
};

const initialConfig = {
  onError,
  nodes: [
    HorizontalRuleNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    LinkNode,
    AutoLinkNode,
    ImageNode,
    CustomHeadingNode,
    {
      replace: HeadingNode,
      with: (node) => {
        return new CustomHeadingNode(node.getTag());
      },
    },
  ],
  theme: editorTheme,
};

const Editor = ({ editable, id, editorState }) => {
  if (!editable && !editorState) {
    console.error("invalid arguments");
  }

  const [isMounted, setIsMounted] = useState(false);
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
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  const namespace = useMemo(
    () => (editable ? (id ? `edit-${id}` : "add") : "view"),
    [editable, id]
  );

  const { historyState } = useSharedHistoryContext();

  return (
    isMounted && (
      <LexicalComposer
        initialConfig={{
          ...initialConfig,
          namespace: namespace,
          editorState,
          editable,
        }}
      >
        {namespace === "add" && (
          <AutoSavePlugin onLoad={() => setIsLoaded(true)} />
        )}
        {editable && <HeaderPlugin id={id} />}
        <div className={styles.modal}>
          <ImagePlugin id={namespace} />
        </div>
        <div className={styles.layer}>
          <FloatingPlugin />
          <LinkHoverPlugin />
          <LinkEditPlugin />
        </div>
        <div
          className={classes(
            styles.container,
            conditionalClass(isLoaded, styles.blocking)
          )}
        >
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
          <HistoryPlugin externalHistoryState={historyState} />
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
