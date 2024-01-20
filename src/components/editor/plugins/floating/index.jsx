import usePressRelease from "@/tools/usePressRelease";
import { computePosition, inline, offset } from "@floating-ui/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { FloatingMenu } from "./menu";

export default function FloatingPlugin() {
  const ref = useRef(null);
  const [coords, setCoords] = useState(undefined);
  const [editor] = useLexicalComposerContext();

  const { isPointerDown, isPointerReleased } = usePressRelease();

  const calculatePosition = useCallback(() => {
    const domSelection = getSelection();
    const domRange =
      domSelection &&
      domSelection.rangeCount !== 0 &&
      domSelection.getRangeAt(0);

    if (!domRange || !ref.current || isPointerDown) return setCoords(undefined);

    computePosition(domRange, ref.current, {
      placement: "top-start",
      middleware: [
        offset({
          mainAxis: 10,
          crossAxis: -10,
        }),
        inline()
      ],
    })
      .then((pos) => setCoords(pos))
      .catch(() => setCoords(undefined));
  }, [isPointerDown]);

  const $handleSelectionChange = useCallback(() => {
    if (
      editor.isComposing() ||
      editor.getRootElement() !== document.activeElement
    ) {
      setCoords(undefined);
      return;
    }

    const selection = $getSelection();

    if (!$isRangeSelection(selection) || selection.anchor.is(selection.focus)) {
      setCoords(undefined);
      return;
    }

    calculatePosition();
  }, [editor, calculatePosition]);

  useEffect(() => {
    const unregisterListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => $handleSelectionChange());
      }
    );

    return unregisterListener;
  }, [isPointerReleased, $handleSelectionChange, editor]);

  useEffect(() => {
    if (!coords && isPointerReleased) {
      editor.getEditorState().read(() => $handleSelectionChange());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPointerReleased, $handleSelectionChange, editor]);

  return <FloatingMenu ref={ref} editor={editor} coords={coords} />;
}
