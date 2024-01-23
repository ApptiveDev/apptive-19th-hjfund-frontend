import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { getEditorState, saveEditorState } from "../../tools/saveEditorState";
const AUTO_SAVE_DELAY = 200;

export default function AutoSavePlugin({ onLoad }) {
  const [editor] = useLexicalComposerContext();
  const autoSaveTimerRef = useRef(null);

  useEffect(() => {
    getEditorState().then((serializedState) => {
      if (serializedState)
        editor.update(() => {
          const editorState = editor.parseEditorState(serializedState);
          editor.setEditorState(editorState);
        });
    });

    const unregister = editor.registerUpdateListener(({ editorState }) => {
      clearTimeout(autoSaveTimerRef.current);

      autoSaveTimerRef.current = setTimeout(() => {
        saveEditorState(editorState.toJSON());
      }, AUTO_SAVE_DELAY);
    });

    return unregister;
  }, []);
}
