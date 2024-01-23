import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { useEffect } from "react";

export default function DebugPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
      
        // if ($isRangeSelection(selection)) {
        //   const node = selection.getNodes();
        //   console.log(node);
        // }
      })
    })

    return () => unregister();
  }, [])
}