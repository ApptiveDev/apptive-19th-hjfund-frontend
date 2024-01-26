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
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isRootNode,
  $setSelection,
  COMMAND_PRIORITY_CRITICAL,
  KEY_ENTER_COMMAND,
} from "lexical";
import { useSharedHistoryContext } from "../../context/sharedHistoryContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function EnterPlugin({ onEnter }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = editor.registerCommand(
      KEY_ENTER_COMMAND,
      onEnter,
      COMMAND_PRIORITY_CRITICAL
    );

    return unregister;
  });
}

export default function ImageComponent({ editor, config, node }) {
  const { historyState } = useSharedHistoryContext();

  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const figureRef = useRef(null);

  const leftHandleRef = useRef(null);
  const rightHandleRef = useRef(null);

  const [src, setSrc] = useState(undefined);
  const [isSelected] = useLexicalNodeSelection(node.__key);
  const [hasCaption, setHasCaption] = useState(!!node.__imageCaption);

  const [options, setOptions] = useState({
    width: node.__imageWidth,
    height: node.__imageHeight,
    maxWidth: node.__imageMaxWidth,
  });

  const downloadImage = useCallback(() => {
    const link = document.createElement("a");
    link.href = src;

    link.download =
      node.getImageType() === "local" ? node.getImageURL() : "downloaded_image";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }, [src]);

  const removeHandler = useCallback(() => {
    editor.update(() => {
      const root = $getRoot();
      root.getChildrenSize() === 1 && root.append($createParagraphNode());
      node.remove();
    });
  }, []);

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

  const onCaptionEnter = useCallback((e) => {
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
    editor.update(() => {
      node.setImageMaxWidth(maxWidth);
    });

    setOptions((prev) => ({
      ...prev,
      maxWidth,
    }));
  }, []);

  useEffect(() => {
    let currentURL;

    if (imageRef.current) {
      imageRef.current.onload = () => {
        const { height, width, naturalHeight, naturalWidth } = imageRef.current;

        handleImageSizeChange(naturalWidth, naturalHeight);

        // 이미지가 화면보다 크면 최대 너비를 조정한다.
        if (height > window.innerHeight * 0.8) {
          handleMaxWidthChange((width * window.innerHeight * 0.8) / height);
        }

        // 화질이 좀 많이 구지면 최대 너비 꽉 맞추기
        if (naturalWidth < 860) {
          handleMaxWidthChange(naturalWidth);
        }
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
    const onPointerMove = (e) => {
      e.stopPropagation();
      window.requestAnimationFrame(() => {
        const { width, left } = figureRef.current.getBoundingClientRect();
        const center = left + width / 2;
        const nowWidth = Math.max(
          Math.min(2 * Math.abs(e.clientX - center)),
          100
        );

        if (imageContainerRef.current) {
          imageContainerRef.current.style.maxWidth = `${nowWidth}px`;
        }
      });
    };

    const onPointerCancel = (e) => {
      e.stopPropagation();
      const containerWidth = figureRef.current.clientWidth;
      const maxWidth = imageContainerRef.current.style.maxWidth;
      handleMaxWidthChange(
        maxWidth >= containerWidth ? undefined : Number(maxWidth.slice(0, -2))
      );

      document.removeEventListener("pointerup", onPointerCancel);
      document.removeEventListener("pointercancel", onPointerCancel);
      document.removeEventListener("pointermove", onPointerMove);
    };

    const onPointerDown = (e) => {
      if (
        (leftHandleRef.current && e.target === leftHandleRef.current) ||
        (rightHandleRef.current && e.target === rightHandleRef.current)
      ) {
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerCancel);
        document.addEventListener("pointercancel", onPointerCancel);
        e.stopPropagation();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <figure
      ref={figureRef}
      className={classes(
        styles.figure,
        conditionalClass(isSelected, styles.selected)
      )}
    >
      <div
        ref={imageContainerRef}
        className={styles.imgcontainer}
        style={{ maxWidth: options.maxWidth }}
      >
        <div className={styles.handles}>
          <span ref={leftHandleRef} className={styles.left} />
          <span ref={rightHandleRef} className={styles.right} />
        </div>
        <div className={styles.tools}>
          <button onClick={downloadImage}>
            <Icon size={18} iconType="download-file" />
          </button>
          <button
            onClick={() => {
              setHasCaption(!hasCaption);
              
              editor.update(() => {
                node.setHasCaption(!hasCaption);
              });
            }}
          >
            <Icon size={18} iconType="align-center" />
          </button>
          <button onClick={removeHandler}>
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
      {hasCaption && (
        <figcaption className={styles.caption}>
          <LexicalNestedComposer initialEditor={node.__imageCaption}>
            <HistoryPlugin externalHistoryState={historyState} />
            <PlainTextPlugin
              contentEditable={<ContentEditable className={styles.text} />}
              placeholder={<p className={styles.placeholder}>이미지 설명</p>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <EnterPlugin onEnter={onCaptionEnter} />
          </LexicalNestedComposer>
        </figcaption>
      )}
    </figure>
  );
}
