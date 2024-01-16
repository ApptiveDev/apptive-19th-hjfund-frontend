import { useCallback, useEffect, useState } from "react";
import { getLocalImage } from "../../tools/localImage";
import Image from "next/image";

import styles from "./styles.module.scss";
import Icon from "@/components/icon";

export default function ImageComponent({ config, node }) {
  const imageRef = useRef(null);

  const [src, setSrc] = useState(undefined);

  const [options, setOptions] = useState({
    caption: node.__imageCaption,
    size: node.__imageSize,
    alignment: node.__imageAlignment,
    maxWidth: node.__imageMaxWidth,
  });

  const handleImageSizeChange = useCallback((width, height) => {
    node.setImageSize({ width, height });

    setOptions((prev) => ({
      ...prev,
      size: { width, height },
    }));
  }, []);

  const handleCaptionChange = useCallback((e) => {
    const caption = e.currentTarget.textContent;

    node.setCaption(caption);

    setOptions((prev) => ({
      ...prev,
      caption,
    }));
  }, []);

  const handleAlignmentChange = useCallback((alignment) => {
    node.setAlignment(alignment);

    setOptions((prev) => ({
      ...prev,
      alignment,
    }));
  }, []);

  const handleMaxWidthChange = useCallback((maxWidth) => {
    node.setMaxWidth(maxWidth);

    setOptions((prev) => ({
      ...prev,
      maxWidth,
    }));
  }, []);

  useEffect(() => {
    let currentURL;

    if (node.getImageType() === "local") {
      const articleId = config.namespace;
      getLocalImage(articleId, node.__imageURL).then((file) => {
        if (!file) return;
        currentURL = URL.createObjectURL(file);

        if (imageRef.current) {
          imageRef.current.onload = () => {
            handleImageSizeChange(
              imageRef.current.width,
              imageRef.current.height
            );
          };

          setSrc(currentURL);
        }
      });
    } else {
      setSrc(node.__imageURL);
    }

    return () => {
      if (currentURL) URL.revokeObjectURL(currentURL);
    };
  }, []);

  return (
    <figure className={styles.figure}>
      <div className={styles.tools}>
        <button>
          <Icon iconType="align-center" />
        </button>
        <button>
          <Icon iconType="download-file" />
        </button>
        <button>
          <Icon iconType="delete-1" />
        </button>
      </div>
      <Image
        className={styles.image}
        ref={imageRef}
        alt={options.caption}
        src={src}
        width={options.size?.width}
        height={options.size?.height}
      />
      {(options.caption || config.namespace === "view") && (
        <figcaption
          className={styles.caption}
          placeholder="이미지 설명을 입력하세요"
          contentEditable
          onChange={handleCaptionChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        />
      )}
    </figure>
  );
}
