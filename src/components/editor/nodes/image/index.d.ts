import {
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";

type ImageType = "local" | "remote" | "external";

export type SerializedImageNode = Spread<
  {
    imageType: ImageType;
    imageURL: string;
    imageCaption?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageMaxWidth?: number;
  },
  SerializedLexicalNode
>;

interface NodeOptions {
  caption?: string;
  width?: number;
  height?: number;
  imageMaxWidth?: number;
}

export declare class ImageNode extends ElementNode {
  __imageType: ImageType;
  __imageURL: string;
  __imageAlt: string;
  __imageCaption: LexicalEditor;
  __imageWidth: number;
  __imageHeight: number;
  __imageMaxWidth: number;

  constructor(
    imageType: ImageType,
    imageURL: string,
    options?: NodeOptions,
    key?: NodeKey
  ): ImageNode;

  static getType(): string;
  static clone(node: ImageNode): ImageNode;

  createDOM(_config: EditorConfig): HTMLDivElement;
  updateDOM(prevNode: ImageNode, dom: HTMLDivElement): boolean;

  getImageType(): ImageType;
  getImageURL(): string;
  getImageOptions(): NodeOptions;

  setImageSize(width: number, height: number): void;
  setCaption(caption: LexicalEditor): void;
  setImageMaxWidth(maxWidth: number): void;

  exportJSON(): SerializedImageNode;
  static importJSON(serializedNode: SerializedImageNode): ImageNode;
}

export declare function $createImageNode(
  imageType: ImageType,
  imageURL: string,
  options?: NodeOptions
): ImageNode;

export declare function $isImageNode(node: LexicalNode): boolean;
export declare function $isLoaclImaageNode(node: ImageNode): boolean;
export declare function $isRemoteImageNode(node: ImageNode): boolean;
export declare function $isExternalImageNode(node: ImageNode): boolean;