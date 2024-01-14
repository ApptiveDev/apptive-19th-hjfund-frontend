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
import { TOGGLE_LINK_COMMAND } from "@lexical/link";

export const FloatingMenu = forwardRef(({ editor, coords }, ref) => {
  const [inlineState, setInlineState] = useState({
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

          setInlineState({
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
      <button className={styles.link} onClick={() => editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)}>
        <Icon size={16} iconType="link-chain" />
        <span>링크</span>
      </button>
      <span className={styles.divider} />
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
