import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Textfield from "@/components/textfield";
import Button from "@/components/button";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";
import { $getSelection, $isRangeSelection } from "lexical";
import { getSelectedNode } from "@/components/editor/tools/getSelectedNode";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import Boolean from "@/components/boolean";
import openLink from "@/components/editor/tools/openLink";
import Icon from "@/components/icon";

const LinkInsertToolbar = forwardRef(({ editor, pos }, ref) => {
  const [link, setLink] = useState("");
  const [newTab, setNewTab] = useState(false);

  useEffect(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const selectedNode = getSelectedNode(selection);
      const node = [selectedNode, selectedNode.getParent()].find($isLinkNode);
      if (node) {
        setLink(node.getURL());
        setNewTab(node.getTarget() === "_blank");
      }
    });
  }, [pos]);

  function enableLink() {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
      url: link,
      target: newTab ? "_blank" : null,
      rel: newTab ? "noopener noreferrer" : null,
    });
  }

  return (
    <div
      ref={ref}
      style={{ top: pos?.y, left: pos?.x }}
      aria-hidden={!pos}
      className={classes(
        styles.container,
        conditionalClass(!pos, styles.hidden)
      )}
    >
      <Textfield
        className={styles.textfield}
        placeholder="https://example.com"
        textfieldSize="small"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        textfieldRight={
          <Icon
            button
            size={16}
            buttonSize={28}
            className={styles.unlink}
            iconType="broken-link-2"
            onClick={() => editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)}
          />
        }
        onKeyUp={(e) => {
          if (e.key === "Enter") enableLink();
        }}
      />
      <div className={styles.bottom}>
        <label className={styles.newTab}>
          <Boolean
            name="open-new-tab"
            value="true"
            checked={newTab}
            onChange={(e) => setNewTab(e.target.checked)}
          />
          <span>새 탭에서 열기</span>
        </label>
        <Button
          buttonSize="small"
          buttonStyle="outlined"
          onClick={() => openLink(link)}
        >
          열기
        </Button>
        <Button buttonSize="small" buttonStyle="filled" onClick={enableLink}>
          적용
        </Button>
      </div>
    </div>
  );
});

export default LinkInsertToolbar;
