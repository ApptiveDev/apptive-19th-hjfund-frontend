import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMANDF,
} from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { mergeRegister } from "@lexical/utils";

import styles from "./styles.module.scss";
import Toolbar from "./toolbar";
import { FontFamily } from "./actions";

const Editor = () => {
  return (
    <div className={styles.container}>
      <LexicalComposer
        initialConfig={{
          theme: {},
        }}
      >
        <Toolbar />
        <div className={styles.editor}>
          <RichTextPlugin
            contentEditable={<ContentEditable className={styles.body} />}
            ErrorBoundary={LexicalErrorBoundary}
            placeholder={
              <p className={styles.placeholder}>본문을 입력해주세요.</p>
            }
          />
          <OnChangePlugin
            onChange={(s) => {
              s.read(() => {
                const content = $getRoot(s);
                console.log(content);
              });
            }}
          />
          <HistoryPlugin />
        </div>
      </LexicalComposer>
    </div>
  );
};

export default Editor;
