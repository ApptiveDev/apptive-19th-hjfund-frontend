import { Context, PropsWithChildren } from "react";

interface ImageContextProps {
  initialImages: ImageData;
}

interface ImageContext {
  images: {
    [key: string]: string;
  };
  addedImageKeys: string[];
  removedImageKeys: string[];
  addImage(key): void;
  removeImage(key): void;
}

declare const Context: Context<ImageData>;

export declare function ImageContextProvider(
  props: PropsWithChildren<ImageContextProps>
): JSX.Element;

export declare function useImageContext(): ImageContext;