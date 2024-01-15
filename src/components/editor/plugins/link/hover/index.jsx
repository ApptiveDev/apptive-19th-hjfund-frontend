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

  const [url, setURL] = useState("");

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

      setURL(node.getURL());
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
    function addListeners(nodeKey) {
      const element = editor.getElementByKey(nodeKey);
      if (!element) return;

      element.pointerEnterHandler = (e) => PointerEnterHandler(e, nodeKey);
      element.addEventListener("pointerleave", PointerLeaveHandler);
      element.addEventListener("pointerenter", element.pointerEnterHandler);
    }

    function removeListeners(nodeKey) {
      const element = editor.getElementByKey(nodeKey);
      if (keyRef.current === nodeKey) setPos(undefined);
      if (!element) return;

      element.removeEventListener("pointerleave", PointerLeaveHandler);
      if (element.pointerEnterHandler) {
        element.removeEventListener(
          "pointerenter",
          element.pointerEnterHandler
        );
      }
    }

    for (const [nodeKey, mutation] of mutatedNodes) {
      switch (mutation) {
        case "created":
          addListeners(nodeKey);
          break;
        case "updated":
          removeListeners(nodeKey);
          addListeners(nodeKey);
          break;
        case "deleted":
          removeListeners(nodeKey);
          break;
      }
    }
  }

  useEffect(() => {
    const unregister = [LinkNode, AutoLinkNode].map((node) =>
      editor.registerMutationListener(node, (node) => mutatedNodesHandler(node))
    );

    return () => unregister.forEach((fn) => fn());
  });

  return (
    <LinkHoverToolbar
      ref={linkHoverToolbarRef}
      editor={editor}
      pos={pos}
      isOpen={isOpen}
      setPointerState={setPointerState}
      url={url}
    />
  );
}
