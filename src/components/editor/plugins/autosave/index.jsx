import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { getEditorState, saveEditorState } from "../../tools/saveEditorState";
import { useMetadataContext } from "../../context/metadataContext";
import { getMetadata, saveMetadata } from "../../tools/saveMetadata";
const AUTO_SAVE_DELAY = 200;

export default function AutoSavePlugin({ onLoad }) {
  const [editor] = useLexicalComposerContext();
  const [metadata, setMetadata] = useMetadataContext();
  const autoSaveTimerRef = useRef(null);

  useEffect(() => {
    getEditorState().then((serializedState) => {
      if (serializedState)
        editor.update(() => {
          const editorState = editor.parseEditorState(serializedState);
          editor.setEditorState(editorState);
        });
    });

    getMetadata().then((metadata) => {
      if (metadata) setMetadata(metadata);
    })

    const unregister = editor.registerUpdateListener(({ editorState }) => {
      clearTimeout(autoSaveTimerRef.current);

      autoSaveTimerRef.current = setTimeout(() => {
        saveEditorState(editorState.toJSON());
      }, AUTO_SAVE_DELAY);
    });

    return unregister;
  }, []);

  useEffect(() => {
    saveMetadata(metadata);
  }, [metadata])
}
