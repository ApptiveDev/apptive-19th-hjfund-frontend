import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, $patchStyleText } from "lexical";
import { useEffect, useState } from "react";
import Dropdown from "../../dropdown";

const FONT_FAMILY_OPTIONS = [
  ["Pretendard", "Pretendard"],
  ["NanumGothic", "나눔고딕"],
  ["Nanum Myeongjo", "나눔명조"],
  ["NanumBarunGothic", "나눔바른고딕"],
  ["NanumSquare", "나눔스퀘어"],
  ["MaruBuri-Regular", "마루부리"],
];

export default function FontFamily() {
  const [editor] = useLexicalComposerContext();
  const [fontFamily, setFontFamily] = useState("Pretendard");

  useEffect(() => {
    console.log(editor);

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          "font-family": fontFamily,
        });
      }
    });
  }, [fontFamily]);

  return (
    <Dropdown
      placeholder="폰트"
      value={fontFamily}
      onChange={(value) => setFontFamily(value)}
    >
      {FONT_FAMILY_OPTIONS.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Dropdown>
  );
}
