import { DecoratorNode } from "lexical";
import styles from "./styles.module.scss";
import ImageComponent from "./component";

export class ImageNode extends DecoratorNode {
  __imageType;
  __imageURL;
  __imageCaption;
  __imageSize;
  __imageAlignment;
  __imageMaxWidth;

  static getType() {
    return "image";
  }

  constructor(imageType, imageURL, key, options) {
    super(key);

    if (typeof imageType !== "string" || typeof imageURL !== "string") {
      throw new Error("Invalid arguments");
    }

    this.__imageType = imageType;
    this.__imageURL = imageURL;

    if (options) {
      this.__imageCaption = options?.caption;
      this.__imageSize = options?.size;
      this.__imageAlignment = options?.alignment ?? "center";
      this.__imageMaxWidth = options?.maxWidth;
    }
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
      alignment: this.__imageAlignment,
      maxWidth: this.__imageMaxWidth,
    };
  }

  setImageSize(size) {
    if (size && size.width && size.height) {
      this.__imageSize = size;
    }
  }

  setCaption(caption) {
    if (typeof caption === "string") {
      this.__imageCaption = caption;
    }
  }

  setImageAlignment(alignment) {
    if (
      alignment === "left" ||
      alignment === "center" ||
      alignment === "right"
    ) {
      this.__imageAlignment = alignment;
    }
  }

  setImageMaxWidth(maxWidth) {
    if (typeof maxWidth === "number") {
      this.__imageMaxWidth = maxWidth;
    }
  }

  exportJSON() {
    return {
      type: "image",
      version: 1,
      imageType: this.__imageType,
      imageURL: this.__imageURL,
      imageCaption: this.__imageCaption,
      imageSize: this.__imageSize,
      imageAlignment: this.__imageAlignment,
      imageMaxWidth: this.__imageMaxWidth,
    };
  }

  static importJSON(json) {
    return new ImageNode(json.imageType, json.imageURL, json.key, {
      caption: json.imageCaption,
      size: json.imageSize,
      alignment: json.imageAlignment,
      maxWidth: json.imageMaxWidth,
    });
  }

  exportDOM() {
    const element = document.createElement("img");
    element.setAttribute("src", this.__imageURL);
  }

  decorate(editor, config) {
    return <ImageComponent editor={editor} config={config} node={this} />;
  }
}
