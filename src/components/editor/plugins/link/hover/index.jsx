import { useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { AutoLinkNode, $isAutoLinkNode, LinkNode } from "@lexical/link";
import { computePosition, inline, shift } from "@floating-ui/react";
import { $getNodeByKey } from "lexical";

import LinkHoverToolbar from "./toolbar";

export default function LinkHoverPlugin() {
  const linkHoverToolbarRef = useRef(null);
  const timeoutRef = useRef(null);
  const keyRef = useRef(null);

  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState(undefined);
  const [pointerState, setPointerState] = useState({
    reference: false,
    target: false,
  });

  const [linkState, setLinkState] = useState({
    isLinkNode: false,
    url: "",
  });

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

      editor.getEditorState().read(() => {
        setIsOpen(false);
        const node = $getNodeByKey(key);

        keyRef.current = key;

        setLinkState({
          isLinkNode: !$isAutoLinkNode(node),
          url: node.getURL(),
        });
      });

      timeoutRef.current = setTimeout(() => {
        computePosition(e.target, linkHoverToolbarRef.current, {
          placement: "bottom",
          middleware: [shift({ padding: 30 }), inline()],
        })
          .then((pos) => setPos(pos))
          .catch(() => setPos(undefined));
      }, 200);
    }

    function PointerLeaveHandler() {
      clearTimeout(timeoutRef.current);
      setPointerState((prev) => ({ ...prev, reference: false }));
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
          if (keyRef.current === nodeKey) setPos(undefined);
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
      isLinkNode={linkState.isLinkNode}
      url={linkState.url}
    />
  );
}
