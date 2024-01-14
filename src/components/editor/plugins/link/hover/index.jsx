import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Icon from "@/components/icon";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { AutoLinkNode, $isAutoLinkNode, LinkNode } from "@lexical/link";
import { computePosition, inline, offset, shift } from "@floating-ui/react";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";
import { $getNodeByKey } from "lexical";

export const LinkHoverToolbar = forwardRef(
  ({ pos, isOpen, setPointerState, nodeKey, editor }, ref) => {
    function copyLink() {
      navigator.clipboard.writeText(url);
      setPointerState({ reference: false, target: false });
    }

    const [url, setURL] = useState(undefined);
    const [isLinkNode, setIsLinkNode] = useState(false);

    useEffect(() => {
      editor.getEditorState().read(() => {
        const node = $getNodeByKey(nodeKey);
        if (!node) return;

        const url = node.getURL();
        setURL(url);
        setIsLinkNode(!$isAutoLinkNode(node));
      });
    }, [isOpen]);

    return (
      <div
        ref={ref}
        onPointerEnter={() =>
          setPointerState((prev) => ({ ...prev, target: true }))
        }
        onPointerLeave={() =>
          setPointerState((prev) => ({ ...prev, target: false }))
        }
        className={classes(
          styles.marginer,
          conditionalClass(!isOpen, styles.hidden)
        )}
        aria-hidden={!isOpen}
        style={isOpen && pos ? { top: pos.y, left: pos.x } : undefined}
      >
        <div className={styles.container}>
          <a
            className={styles.url}
            href={url}
            target="_blank"
            rel="__noreferrer"
          >
            <Icon size={12} iconType="link-chain" className={styles.linkicon} />
            <span>{url}</span>
          </a>
          <div className={styles.buttons}>
            <button onClick={() => copyLink()}>
              <Icon size={14} iconType="copy-paste" />
            </button>
            {isLinkNode && (
              <button>
                <Icon size={14} iconType="pencil" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default function LinkHoverPlugin() {
  const linkHoverToolbarRef = useRef(null);

  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState(undefined);
  const [pointerState, setPointerState] = useState({
    reference: false,
    target: false,
  });
  const [nodeKey, setNodeKey] = useState(undefined);

  useEffect(() => {
    if (Object.values(pointerState).every((e) => !e)) {
      setIsOpen(false);
      setPos(undefined);
    }
  }, [pointerState]);

  useEffect(() => {
    if (pos) {
      setIsOpen(true);
      setPointerState((prev) => ({ ...prev, reference: true }));
    }
  }, [pos]);

  useEffect(() => {
    function PointerEnterHandler(e, key) {
      const { anchorOffset, focusOffset } = getSelection();
      if (
        !e.target ||
        !linkHoverToolbarRef.current ||
        anchorOffset != focusOffset
      )
        return;

      computePosition(e.target, linkHoverToolbarRef.current, {
        placement: "bottom-start",
        middleware: [
          offset({
            crossAxis: -10,
          }),
          inline(),
          shift()
        ],
      })
        .then((pos) =>
          setTimeout(() => {
            setPos(pos);
            console.log(pos);
            setNodeKey(key);
          }, 200)
        )
        .catch(() => setPos(undefined));
    }

    function PointerLeaveHandler() {
      setTimeout(
        () => setPointerState((prev) => ({ ...prev, reference: false })),
        100
      );
    }

    function mutatedNodesHandler(mutatedNodes) {
      for (const [nodeKey, mutation] of mutatedNodes) {
        if (mutation === "created") {
          const element = editor.getElementByKey(nodeKey);
          if (!element) return;

          element.addEventListener("pointerleave", PointerLeaveHandler);
          element.addEventListener("pointerenter", (e) =>
            PointerEnterHandler(e, nodeKey)
          );
        } else if (mutation === "destroyed") {
          const element = editor.getElementByKey(nodeKey);
          if (!element) return;

          element.removeEventListener("pointerleave", PointerLeaveHandler);
          element.removeEventListener("pointerenter", (e) =>
            PointerEnterHandler(e, nodeKey)
          );
        }
      }
    }

    const removeListeners = [LinkNode, AutoLinkNode].map((node) =>
      editor.registerMutationListener(node, mutatedNodesHandler)
    );

    return () => removeListeners.forEach((fn) => fn());
  }, []);

  return (
    <LinkHoverToolbar
      ref={linkHoverToolbarRef}
      editor={editor}
      pos={pos}
      isOpen={isOpen}
      setPointerState={setPointerState}
      nodeKey={nodeKey}
    />
  );
}
