import { InitialEditorStateType } from "@lexical/react/LexicalComposer";

interface EditorProps {
  editable?: boolean;
  id?: string;
  editorState?: InitialEditorStateType;
}

declare const Editor: React.FC<EditorProps>;
export default Editor;