import {
  EditorConfig,
  ElementNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";

type ImageType = "local" | "remote" | "external";
type ImageSize = { width: number; height: number };
type ImageAlignment = "left" | "center" | "right";

export type SerializedImageNode = Spread<
  {
    imageType: ImageType;
    imageURL: string;
    imageCaption?: string;
    imageSize?: ImageSize;
    imageAlignment?: ImageAlignment;
    imageMaxWidth?: number;
  },
  SerializedLexicalNode
>;

interface NodeOptions {
  caption?: string;
  size?: ImageSize;
  alignment?: ImageAlignment;
  imageMaxWidth?: number;
}

declare class ImageNode extends ElementNode {
  __imageType: ImageType;
  __imageURL: string;
  __imageAlt: string;
  __imageCaption: string;
  __imageSize: ImageSize;
  __imageAlignment: ImageAlignment;
  __imageMaxWidth: number;

  constructor(
    imageType: ImageType,
    imageURL: string,
    key?: NodeKey,
    options?: NodeOptions
  ): ImageNode;

  createDOM(_config: EditorConfig): HTMLDivElement;
  updateDOM(prevNode: ImageNode, dom: HTMLDivElement): boolean;

  getImageType(): ImageType;
  getImageURL(): string;
  getImageOptions(): NodeOptions;

  setCaption(caption: string): void;
  setImageAlignment(alignment: ImageAlignment): void;
  setImageMaxWidth(maxWidth: number): void;

  exportJSON(): SerializedImageNode;
  static importJSON(serializedNode: SerializedImageNode): ImageNode;
}
