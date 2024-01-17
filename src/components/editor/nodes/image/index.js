import { $applyNodeReplacement, DecoratorNode, LexicalEditor, createEditor } from "lexical";
import styles from "./styles.module.scss";
import ImageComponent from "./component";

export class ImageNode extends DecoratorNode {
  __imageType;
  __imageURL;
  __imageCaption;
  __imageWidth;
  __imageHeight;
  __imageMaxWidth;

  static getType() {
    return "image";
  }

  constructor(imageType, imageURL, options, key) {
    super(key);

    if (typeof imageType !== "string" || typeof imageURL !== "string") {
      throw new Error("Invalid arguments");
    }

    this.__imageType = imageType;
    this.__imageURL = imageURL;

    if (options) {
      this.__imageCaption = options?.caption || createEditor();
      this.__imageWidth = options?.width;
      this.__imageHeight = options?.height;
      this.__imageMaxWidth = options?.maxWidth;
    }
  }

  static clone(node) {
    return new ImageNode(
      node.__imageType,
      node.__imageURL,
      {
        caption: node.__imageCaption,
        width: node.__imageWidth,
        height: node.__imageHeight,
        maxWidth: node.__imageMaxWidth,
      },
      node.key
    );
  }

  createDOM(_config) {
    const dom = document.createElement("div");
    dom.classList.add(styles.image);

    return dom;
  }

  updateDOM(_prevNode, _dom) {
    return false;
  }

  getImageType() {
    return this.__imageType;
  }

  getImageURL() {
    return this.__imageURL;
  }

  getImageOptions() {
    return {
      caption: this.__imageCaption,
      size: this.__imageSize,
      maxWidth: this.__imageMaxWidth,
    };
  }

  getCaption() {
    return this.__imageCaption;
  }

  setImageSize(width, height) {
    const writable = this.getWritable();

    if (typeof width === "number" && typeof height === "number") {
      writable.__imageWidth = width;
      writable.__imageHeight = height;
    }
  }

  setCaption(caption) {
    const writable = this.getWritable();

    if (caption instanceof LexicalEditor) {
      writable.__imageCaption = caption;
    }
  }

  setImageMaxWidth(maxWidth) {
    const writable = this.getWritable();

    if (typeof maxWidth === "number") {
      console.log(maxWidth);
      writable.__imageMaxWidth = maxWidth;
    }
  }

  exportJSON() {
    return {
      type: "image",
      version: 1,
      imageType: this.__imageType,
      imageURL: this.__imageURL,
      imageCaption: this.__imageCaption.toJSON(),
      imageWidth: this.__imageWidth,
      imageHeight: this.__imageHeight,
      imageMaxWidth: this.__imageMaxWidth,
    };
  }

  static importJSON(json) {
    const node = new ImageNode(
      json.imageType,
      json.imageURL,
      {
        width: json.imageWidth,
        height: json.imageHeight,
        maxWidth: json.imageMaxWidth,
      },
      json.key
    );

    const nestedEditor = node.__imageCaption;
    const editorState = nestedEditor.parseEditorState(json.imageCaption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }

    return node;
  }

  exportDOM() {
    const element = document.createElement("img");
    element.setAttribute("src", this.__imageURL);
  }

  decorate(editor, config) {
    return <ImageComponent editor={editor} config={config} node={this} />;
  }
}

export function $createImageNode(imageType, imageURL, options) {
  return $applyNodeReplacement(new ImageNode(imageType, imageURL, options));
}

export function $isImageNode(node) {
  return node instanceof ImageNode;
}

export function $isLocalImageNode(node) {
  return node instanceof ImageNode && node.__imageType === "local";
}

export function $isRemoteImageNode(node) {
  return node instanceof ImageNode && node.__imageType === "remote";
}

export function $isExternalImageNode(node) {
  return node instanceof ImageNode && node.__imageType === "external";
}
