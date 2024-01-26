import { createContext, useCallback, useContext, useMemo, useState } from "react";

const Context = createContext({});

export function ImageContextProvider({ initialImages = {}, children }) {
  const images = useMemo(() => initialImages, [initialImages]);
  const [addedImageKeys, setAddedImageKeys] = useState([]);
  const [removedImageKeys, setRemovedImageKeys] = useState([]);

  const addImage = useCallback((key) => {
    if (removedImageKeys.includes(key)) {
      setRemovedImageKeys((prev) => prev.filter((k) => k !== key));
    } else {
        setAddedImageKeys((prev) => prev.includes(key) ? prev : [...prev, key]);
    }
  }, []);

  const removeImage = useCallback((key) => {
    if (addedImageKeys.includes(key)) {
      setAddedImageKeys((prev) => prev.filter((k) => k !== key));
    } else {
      if (!removedImageKeys.includes(key))
        setRemovedImageKeys((prev) => prev.includes(key) ? prev : [...prev, key]);
    }
  }, []);

  const imageContext = useMemo(
    () => ({
      images,
      addedImageKeys,
      removedImageKeys,
      addImage,
      removeImage,
    }),
    [images, addedImageKeys, removedImageKeys, addImage, removeImage]
  );

  return <Context.Provider value={imageContext}>{children}</Context.Provider>;
}

export const useImageContext = () => {
  return useContext(Context);
};
