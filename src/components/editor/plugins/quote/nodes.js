import styles from "./styles.module.scss";
import { $applyNodeReplacement, ElementNode } from "lexical";

const svgElement = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.32004 3.01381C3.77335 3.66773 2 7.81537 2 11.963V19.0014C2 20.106 2.89543 21.0014 4 21.0014H8.42105C9.52562 21.0014 10.4211 20.106 10.4211 19.0014V13.9631C10.4211 12.8585 9.52562 11.9631 8.42105 11.9631L5.1579 11.963C5.1579 11.963 4.71406 6.72291 7.49462 5.42933C7.94231 5.22106 8.31579 4.81968 8.31579 4.32591V3.9247C8.31579 3.37241 7.86317 2.91367 7.32004 3.01381ZM19.9999 11.9631L16.7368 11.963C16.7368 11.963 16.2929 6.72291 19.0735 5.42933C19.5212 5.22106 19.8946 4.81968 19.8946 4.32591V3.9247C19.8946 3.37241 19.442 2.91367 18.8989 3.01381C15.3522 3.66773 13.5789 7.81537 13.5789 11.963V19.0014C13.5789 20.106 14.4743 21.0014 15.5789 21.0014H19.9999C21.1045 21.0014 21.9999 20.106 21.9999 19.0014V13.9631C21.9999 12.8585 21.1045 11.9631 19.9999 11.9631Z" fill="black"/>
</svg>`;

const createSVG = (dom) => {
  const parsedSvg = new DOMParser().parseFromString(
    svgElement,
    "image/svg+xml"
  );

  const svg1 = parsedSvg.documentElement;
  const svg2 = parsedSvg.documentElement.cloneNode(true);

  svg1.classList.add(styles.icon, styles.left);
  svg2.classList.add(styles.icon, styles.right);

  dom.appendChild(svg1);
  dom.appendChild(svg2);
};

export class CustomQuoteContainerNode extends ElementNode {
  static getType() {
    return "quote-container";
  }

  static clone(node) {
    return new CustomQuoteContainerNode(node.__key);
  }

  createDOM(config) {
    const dom = super.createDOM(config);

    dom.classList.add(styles.quote);
    createSVG(dom);

    return dom;
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
      type: "quote-container",
    };
  }

  updateDOM(_prev, _dom) {
    return false;
  }
}

export function $createCustomQuoteContainerNode() {
  return $applyNodeReplacement(new CustomQuoteContainerNode());
}

export function $isCustomQuoteContainerNode(node) {
  return node instanceof CustomQuoteContainerNode;
}