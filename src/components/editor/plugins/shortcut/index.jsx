import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { UNORDERED_LIST, ORDERED_LIST } from "@lexical/markdown";

const transformers = [
  UNORDERED_LIST, ORDERED_LIST
]

export default function ShortcutPlugin() {
  return <MarkdownShortcutPlugin transformers={transformers} />;
}
