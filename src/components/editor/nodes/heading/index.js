import { HeadingNode } from "@lexical/rich-text";
import { $applyNodeReplacement } from "lexical";

export class CustomHeadingNode extends HeadingNode {
  static getType() {
    return "custom-heading";
  }

  constructor(tag, key) {
    super(tag, key);
  }

  static clone(node) {
    return new CustomHeadingNode(node.tag, node.key);
  }

  createDOM(config) {
    const tagOverride = {
      h1: "h2",
      h2: "h3",
      h3: "h4",
      h4: "h4",
      h5: "h4",
      h6: "h4",
    };

    const dom = document.createElement(tagOverride[this.__tag]);
    const className = config.theme.heading?.[this.__tag];
    if (className) dom.classList.add();

    return dom;
  }

  updateDOM(_prevNode, _dom) {
    return false;
  }

  static importJSON(serializedNode) {
    const node = $createHeadingNode(serializedNode.tag);
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      tag: this.getTag(),
      type: "custom-heading",
      version: 1,
    };
  }
}

export function $createHeadingNode(tag) {
  return $applyNodeReplacement(new CustomHeadingNode(tag));
}

export function $isHeadingNode(node) {
  return node instanceof CustomHeadingNode;
}
