import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { UNORDERED_LIST, ORDERED_LIST, QUOTE } from "@lexical/markdown";

const transformers = [
  UNORDERED_LIST, ORDERED_LIST, QUOTE
]

export default function ShortcutPlugin() {
  return <MarkdownShortcutPlugin transformers={transformers} />;
}
