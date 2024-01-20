import { $getSelection, $isRangeSelection } from "lexical";

import LinkInsertToolbar from "./toolbar";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { computePosition, inline, offset, shift } from "@floating-ui/react";
import { $isLinkNode, $isAutoLinkNode } from "@lexical/link";
import { getSelectedNode } from "@/components/editor/tools/getSelectedNode";

export default function LinkEditPlugin() {
  const [editor] = useLexicalComposerContext();

  const toolbarRef = useRef(null);
  const [pos, setPos] = useState(undefined);

  const calculatePosition = useCallback(() => {
    const domSelection = getSelection();
    const domRange =
      domSelection &&
      domSelection.rangeCount !== 0 &&
      domSelection.getRangeAt(0);

    if (!domRange || !toolbarRef.current) return setPos(undefined);

    computePosition(domRange, toolbarRef.current, {
      placement: "bottom",
      middleware: [shift({ padding: 30 }), inline(), offset(10)],
    })
      .then((pos) => setPos(pos))
      .catch(() => setPos(undefined));
  }, []);

  const $handleSelectionChange = useCallback(() => {
    if (
      editor.isComposing() ||
      editor.getRootElement() !== document.activeElement
    ) {
      setPos(undefined);
      return;
    }

    const selection = $getSelection();

    if (!$isRangeSelection(selection)) return setPos(undefined);

    const node = getSelectedNode(selection);
    const parent = node.getParent();

    if (
      (!$isLinkNode(parent) && !$isLinkNode(node)) ||
      $isAutoLinkNode(parent) ||
      $isAutoLinkNode(node)
    )
      return setPos(undefined);

    calculatePosition();
  }, []);

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => $handleSelectionChange());
    });

    return () => unregister();
  }, [editor]);

  return <LinkInsertToolbar ref={toolbarRef} pos={pos} editor={editor} />;
}
