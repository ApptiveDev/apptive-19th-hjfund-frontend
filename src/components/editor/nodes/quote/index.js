
import { QuoteNode } from "@lexical/rich-text";
import styles from "./styles.module.scss";
import { $applyNodeReplacement, $createLineBreakNode, $createParagraphNode, $createTextNode } from "lexical";

export default class CustomQuoteNode extends QuoteNode {
  static getType() {
    return "quote";
  }

  static clone(node) {
    return new CustomQuoteNode(node.__key);
  }

  createDOM(config) {
    const dom = super.createDOM(config);

    dom.classList.add(styles.quote);

    return dom;
  }

  updateDOM(_prevNode, _dom) {
    return false;
  }

  static importJSON(serializedNode) {
    const node = $createQuoteNode();
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "quote",
    };
  }
}

export function $createQuoteNode(key) {
  return $applyNodeReplacement(new CustomQuoteNode(key));
}

export function $isQuoteNode(node) {
  return node instanceof CustomQuoteNode;
}