import { forwardRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";
import Icon from "@/components/icon";

import BoldIcon from "./icons/bold.svg";
import ItalicIcon from "./icons/italic.svg";
import StrikethroughIcon from "./icons/strikethrough.svg";
import UnderlineIcon from "./icons/underline.svg";
import PalleteIcon from "./icons/pallete.svg";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { TOGGLE_LINK_COMMAND, $isLinkNode } from "@lexical/link";
import { getSelectedNode } from "../../tools/getSelectedNode";

export const FloatingMenu = forwardRef(({ editor, coords }, ref) => {
  const [isSameNode, setIsSameNode] = useState(false);

  const [inlineState, setInlineState] = useState({
    isLink: false,
    isBold: false,
    isItalic: false,
    isStrikethrough: false,
    isUnderline: false,
  });

  useEffect(() => {
    const unregisterListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;

          const anchorNode = selection.anchor.getNode().getTopLevelElement();
          const focusNode = selection.focus.getNode().getTopLevelElement();

          const isSameNode =
            anchorNode &&
            focusNode &&
            anchorNode.getKey() === focusNode.getKey();

          setIsSameNode(isSameNode);

          const node = getSelectedNode(selection);
          const parent = node.getParent();

          setInlineState({
            isLink: isSameNode && ($isLinkNode(parent) || $isLinkNode(node)),
            isBold: selection.hasFormat("bold"),
            isItalic: selection.hasFormat("italic"),
            isStrikethrough: selection.hasFormat("strikethrough"),
            isUnderline: selection.hasFormat("underline"),
          });
        });
      }
    );

    return unregisterListener;
  }, [editor]);

  return (
    <div
      ref={ref}
      style={coords ? { top: coords.y, left: coords.x } : undefined}
      aria-hidden={!coords}
      className={classes(
        styles.floating,
        conditionalClass(!coords, styles.hidden)
      )}
    >
      {isSameNode && (
        <>
          <button
            className={classes(
              styles.link,
              conditionalClass(inlineState.isLink, styles.active)
            )}
            onClick={() =>
              editor.dispatchCommand(
                TOGGLE_LINK_COMMAND,
                inlineState.isLink ? null : "https://"
              )
            }
          >
            <Icon size={16} iconType="link-chain" />
            <span>링크</span>
          </button>
          <span className={styles.divider} />
        </>
      )}
      <button
        className={classes(
          styles.icon,
          conditionalClass(inlineState.isBold, styles.active)
        )}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        <BoldIcon />
      </button>
      <button
        className={classes(
          styles.icon,
          conditionalClass(inlineState.isItalic, styles.active)
        )}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <ItalicIcon />
      </button>
      <button
        className={classes(
          styles.icon,
          conditionalClass(inlineState.isStrikethrough, styles.active)
        )}
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
      >
        <StrikethroughIcon />
      </button>
      <button
        className={classes(
          styles.icon,
          conditionalClass(inlineState.isUnderline, styles.active)
        )}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        <UnderlineIcon />
      </button>
      {/* <button className={classes(styles.icon, styles.pallete)}>
        <span />
        <PalleteIcon />
      </button> */}
    </div>
  );
});
