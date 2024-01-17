import { useCallback, useEffect, useRef, useState } from "react";
import { getLocalImage } from "../../tools/localImage";
import Image from "next/image";

import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import styles from "./styles.module.scss";
import Icon from "@/components/icon";
import {
  $createParagraphNode,
  $createTextNode,
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  $isRootNode,
  $isTextNode,
  $setSelection,
  COMMAND_PRIORITY_CRITICAL,
  KEY_ENTER_COMMAND,
} from "lexical";
import { useSharedHistoryContext } from "../../context/sharedHistoryContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import mergeRegister from "../../tools/mergeRegister";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

export default function ImageComponent({ editor, config, node }) {
  const { historyState } = useSharedHistoryContext();

  const imageRef = useRef(null);

  const [src, setSrc] = useState(undefined);

  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(
    node.__key
  );

  const [options, setOptions] = useState({
    width: node.__imageWidth,
    height: node.__imageHeight,
    maxWidth: node.__imageMaxWidth,
  });

  const insertNewLine = useCallback((e, text) => {
    $setSelection(null);
    e.preventDefault();
    editor.focus();

    editor.update(() => {
      const newParagraph = $createParagraphNode();

      if (text) {
        const newText = $createTextNode(text);
        newParagraph.append(newText);
      }

      node.insertAfter(newParagraph);
      newParagraph.select();
    });
  }, []);

  const onCapttionEnter = useCallback((e) => {
    if (e.shiftKey) return false;

    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return false;

    const startOffset = selection.anchor.offset;
    const endOffset = selection.focus.offset;
    const selectedNode = selection.anchor.getNode();
    if ($isRootNode(selectedNode)) return insertNewLine(e);

    const text = selectedNode.getTextContent();
    const remainText = text.slice(0, startOffset);
    const nextText = text.slice(endOffset);
    selectedNode.setTextContent(remainText);

    insertNewLine(e, nextText);
    return true;
  }, []);

  const handleImageSizeChange = useCallback((width, height) => {
    editor.update(() => {
      node.setImageSize(width, height);
    });

    setOptions((prev) => ({
      ...prev,
      size: { width, height },
    }));
  }, []);

  const handleMaxWidthChange = useCallback((maxWidth) => {
    node.setMaxWidth(maxWidth);

    setOptions((prev) => ({
      ...prev,
      maxWidth,
    }));
  }, []);

  useEffect(() => {
    let currentURL;

    if (imageRef.current) {
      imageRef.current.onload = () => {
        handleImageSizeChange(imageRef.current.width, imageRef.current.height);
      };
    }

    if (node.getImageType() === "local") {
      const articleId = config.namespace;
      getLocalImage(articleId, node.__imageURL).then((file) => {
        if (!file) return;
        currentURL = URL.createObjectURL(file);
        setSrc(currentURL);
      });
    } else {
      setSrc(node.__imageURL);
    }

    return () => {
      if (currentURL) URL.revokeObjectURL(currentURL);
    };
  }, []);

  useEffect(() => {
    if (node.__imageCaption) {
      const captionEditor = node.__imageCaption;

      const unregister = captionEditor.registerCommand(
        KEY_ENTER_COMMAND,
        onCapttionEnter,
        COMMAND_PRIORITY_CRITICAL
      );

      return unregister;
    }
  }, [node.__imageCaption]);

  useEffect(() => {
    const unregister = mergeRegister(

    );

    return () => {
      unregister();
    }
  }, [node.__imageCaption, isSelected]);

  return (
    <figure
      className={classes(
        styles.figure,
        conditionalClass(isSelected, styles.selected)
      )}
    >
      <div className={styles.imgcontainer}>
        <div className={styles.tools}>
          <button>
            <Icon size={18} iconType="download-file" />
          </button>
          <button>
            <Icon size={14} iconType="delete-1" />
          </button>
        </div>
        {options.size ? (
          <Image
            className={styles.image}
            ref={imageRef}
            src={src}
            alt="이미지"
            width={options.size.width}
            height={options.size.height}
          />
        ) : (
          <img className={styles.image} ref={imageRef} alt="이미지" src={src} />
        )}
      </div>
      {(options.caption || config.namespace !== "view") && (
        <figcaption className={styles.caption}>
          {node.__imageCaption && (
            <LexicalNestedComposer initialEditor={node.__imageCaption}>
              <HistoryPlugin externalHistoryState={historyState} />
              <PlainTextPlugin
                contentEditable={<ContentEditable className={styles.text} />}
                placeholder={<p className={styles.placeholder}>이미지 설명</p>}
                ErrorBoundary={LexicalErrorBoundary}
              />
            </LexicalNestedComposer>
          )}
        </figcaption>
      )}
    </figure>
  );
}
