import { useCallback, useEffect, useRef, useState } from "react";
import { getLocalImage } from "../../tools/localImage";
import Image from "next/image";

import styles from "./styles.module.scss";
import Icon from "@/components/icon";

export default function ImageComponent({ editor, config, node }) {
  const imageRef = useRef(null);

  const [src, setSrc] = useState(undefined);

  const [options, setOptions] = useState({
    caption: node.__imageCaption,
    width: node.__imageWidth,
    height: node.__imageHeight,
    maxWidth: node.__imageMaxWidth,
  });

  const handleImageSizeChange = useCallback((width, height) => {
    editor.update(() => {
      node.setImageSize(width, height);
    });

    setOptions((prev) => ({
      ...prev,
      size: { width, height },
    }));
  }, []);

  const handleCaptionChange = useCallback((e) => {
    const caption = e.currentTarget.textContent.trim();

    editor.update(() => {
      node.setImageCaption(caption);
    });

    setOptions((prev) => ({
      ...prev,
      caption,
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

    if (imageRef.current) {
      imageRef.current.onload = () => {
        handleImageSizeChange(imageRef.current.width, imageRef.current.height);
      };
    }

    if (node.getImageType() === "local") {
      const articleId = config.namespace;
      getLocalImage(articleId, node.__imageURL).then((file) => {
        if (!file) return;
        currentURL = URL.createObjectURL(file);
        setSrc(currentURL);
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
      <div className={styles.imgcontainer}>
        <div className={styles.tools}>
          <button>
            <Icon size={18} iconType="download-file" />
          </button>
          <button>
            <Icon size={14} iconType="delete-1" />
          </button>
        </div>
        {options.size ? (
          <Image
            className={styles.image}
            ref={imageRef}
            alt={options.caption ?? "이미지"}
            src={src}
            width={options.size.width}
            height={options.size.height}
          />
        ) : (
          <img
            className={styles.image}
            ref={imageRef}
            alt={options.caption}
            src={src}
          />
        )}
      </div>
      {(options.caption || config.namespace !== "view") && (
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
