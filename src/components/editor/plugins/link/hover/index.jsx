import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Icon from "@/components/icon";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { computePosition, inline, offset } from "@floating-ui/react";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

export const LinkHoverToolbar = forwardRef(
  ({ pos, url, type, isOpen, setPointerState }, ref) => {
    function copyLink() {
      navigator.clipboard.writeText(url);
      setPointerState({ reference: false, target: false });
    }

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
          styles.container,
          conditionalClass(!isOpen, styles.hidden)
        )}
        aria-hidden={!isOpen}
        style={isOpen && pos ? { top: pos.y, left: pos.x } : undefined}
      >
        <a className={styles.url} href={url} target="_blank" rel="__noreferrer">
          <Icon size={12} iconType="link-chain" />
          <span>{url}</span>
        </a>
        <div className={styles.buttons}>
          <button onClick={() => copyLink()}>
            <Icon size={14} iconType="copy-paste" />
          </button>
          {type === "link" && (
            <button>
              <Icon size={14} iconType="pencil" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

export default function LinkHoverPlugin() {
  const linkHoverToolbarRef = useRef(null);
  const timeoutRef = useRef(null);

  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState(undefined);
  const [pointerState, setPointerState] = useState({
    reference: false,
    target: false,
  });
  const [linkState, setLinkState] = useState({
    url: undefined,
    key: undefined,
    type: undefined,
  });

  useEffect(() => {
    if (Object.values(pointerState).some((e) => e)) {
      clearTimeout(timeoutRef.current);
      setIsOpen(true);
    } else {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
    }
  }, [pointerState]);

  useEffect(() => {
    function PointerEnterHandler(e, url, key, type) {
      const { anchorOffset, focusOffset } = getSelection();
      if (
        !e.target ||
        !linkHoverToolbarRef.current ||
        anchorOffset != focusOffset
      )
        return;

      computePosition(e.target, linkHoverToolbarRef.current, {
        placement: "bottom",
        middleware: [offset(10), inline()],
      })
        .then((pos) => {
          setPos(pos);
          setLinkState({ url, key, type });
          setPointerState((prev) => ({ ...prev, reference: true }));
        })
        .catch(() => setPos(undefined));
    }

    function PointerLeaveHandler() {
      setTimeout(
        () => setPointerState((prev) => ({ ...prev, reference: false })),
        100
      );
    }

    function nodeHandler(node) {
      const key = node.getKey();
      const url = node.getURL();
      const type = node.getType();

      const element = editor.getElementByKey(key);
      if (!element) return;

      setLinkState({
        key,
        url: node.getURL(),
        type: node.getType(),
      });

      element.removeEventListener("pointerleave", PointerLeaveHandler);
      element.removeEventListener("pointerenter", (e) =>
        PointerEnterHandler(e, url, key, type)
      );

      element.addEventListener("pointerleave", PointerLeaveHandler);
      element.addEventListener("pointerenter", (e) =>
        PointerEnterHandler(e, url, key, type)
      );
    }

    const removeAutoLinkTransform = editor.registerNodeTransform(
      AutoLinkNode,
      nodeHandler
    );
    const removeLinkTransform = editor.registerNodeTransform(
      LinkNode,
      nodeHandler
    );

    return () => {
      removeAutoLinkTransform();
      removeLinkTransform();
    };
  }, []);

  return (
    <LinkHoverToolbar
      ref={linkHoverToolbarRef}
      editor={editor}
      pos={pos}
      isOpen={isOpen}
      setPointerState={setPointerState}
      url={linkState.url}
      nodeKey={linkState.key}
      type={linkState.type}
    />
  );
}
