import {
  HeadingNode,
  HeadingTagType,
  SerializedHeadingNode,
} from "@lexical/rich-text";
import { EditorConfig } from "lexical";

export declare class CustomHeadingNode extends HeadingNode {
  static getType(): string;
  constructor(tag: HeadingTagType, key?: string);
  static clone(node: CustomHeadingNode): CustomHeadingNode;

  createDOM(config: EditorConfig): HTMLHeadingElement;
  updateDOM(prevNode: CustomHeadingNode, dom: HTMLHeadingElement): boolean;

  static importJSON(serializedNode: SerializedHeadingNode): CustomHeadingNode;
  exportJSON(): SerializedHeadingNode;
}

export declare function $createHeadingNode(
  tag: HeadingTagType,
  key?: string
): CustomHeadingNode;

export declare function $isHeadingNode(node: any): boolean;