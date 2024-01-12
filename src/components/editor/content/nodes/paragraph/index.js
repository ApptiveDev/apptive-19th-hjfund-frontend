import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  ParagraphNode,
} from "lexical";
import styles from "./styles.module.scss";

const PLACEHOLDER = `"/"를 입력하여 커맨드 입력`;

class CustomParagraphNode extends ParagraphNode {
  constructor() {
    super();
    this.type = "custom-paragraph";
  }

  static getType() {
    return this.type;
  }

  static clone(node) {
    return new CustomParagraphNode(node.getTextContent());
  }

  importJSON(serializedNode) {
    return super.importJSON(serializedNode);
  }

  exportJSON() {
    return super.exportJSON();
  }

  isCompletelyEmpty() {
    const rootNode = $getRoot();
    const children = rootNode.getChildren();

    if (children.length <= 1 && children[0].getTextContent() === "")
      return true;
  }

  hasPlaceholder() {
    // is focused and empty
    const selection = $getSelection();
    if (!this.getTextContent() && $isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const focusNode = selection.focus.getNode();
      const nodeId = this.__key;

      return anchorNode.__key === nodeId || focusNode.__key === nodeId;
    }

    return false;
  }

  createDOM(config) {
    const dom = super.createDOM(config);

    dom.setAttribute("placeholder", PLACEHOLDER);
    dom.classList.add(styles.node);

    if (this.isCompletelyEmpty || this.hasPlaceholder()) {
      dom.classList.add(styles.empty);
    }

    return dom;
  }

  updateDOM(prevNode, dom, config) {
    super.updateDOM(prevNode, dom, config);

    if (this.hasPlaceholder()) {
      dom.classList.add(styles.empty);
    } else {
      dom.classList.remove(styles.empty);
    }
  }
}

export default CustomParagraphNode;
