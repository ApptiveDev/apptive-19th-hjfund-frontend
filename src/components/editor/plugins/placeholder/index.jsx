import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $getSelection, $isParagraphNode, $isRangeSelection } from "lexical";
import { useEffect, useRef } from "react";

import styles from "./styles.module.scss";
import { $isHeadingNode } from "@lexical/rich-text";

const placeholders = {
  paragraph: "'/'를 입력하여 명령어를 사용하세요.",
  h1: "제목 1",
  h2: "제목 2",
  h3: "제목 3",
};

function initialize(editor) {
  editor.update(() => {
    const root = $getRoot();
    const children = root.getChildren();

    children.forEach((child) => {
      const node = child.getTopLevelElement();

      const element = editor.getElementByKey(child.getKey());
      addPlaceholder(element, node);

      if (
        children.length === 1 &&
        $isParagraphNode(node) &&
        child.getTextContentSize() === 0
      ) {
        element.classList.add(styles.empty);
      }
    });
  });
}

function addPlaceholder(element, node) {
  let type = node.getType();

  if ($isHeadingNode(node)) {
    type = node.getTag();
  }

  if (
    placeholders.hasOwnProperty(type) &&
    !element.classList.contains(styles.placeholder)
  ) {
    element.classList.add(styles.placeholder);
    element.setAttribute("placeholder", placeholders[type]);
  }
}

function checkIsEmpty(element, node) {
  if (node.getTextContentSize() === 0) {
    element.classList.add(styles.empty);
  } else {
    element.classList.remove(styles.empty);
  }
}

function cleanUpPreviousCursor(editor, cursorAt, key) {
  if (cursorAt !== null && key !== cursorAt) {
    const prevElement = editor.getElementByKey(cursorAt);
    if (prevElement) prevElement.classList.remove(styles.empty);
  }
}

export default function PlaceholderPlugin() {
  const [editor] = useLexicalComposerContext();
  const cursorAt = useRef(null);

  if (!editor.isEditable()) return null;

  useEffect(() => {
    initialize(editor);

    const removeUpdateListener = editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();

        // check cursor position
        if ($isRangeSelection(selection) && selection.isCollapsed()) {
          const nodes = selection.getNodes();
          if (nodes.length === 1) {
            const node = nodes[0].getTopLevelElement();
            const key = node.getKey();
            const element = editor.getElementByKey(key);

            cleanUpPreviousCursor(editor, cursorAt.current, key);
            addPlaceholder(element, node);
            checkIsEmpty(element, node);
            if (node.getType() === "paragraph") cursorAt.current = key;
          }
        }
      });
    });

    return () => {
      removeUpdateListener();
    };
  }, []);

  return <></>;
}
