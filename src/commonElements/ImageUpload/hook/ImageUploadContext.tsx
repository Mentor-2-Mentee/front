import { createContext, useContext, useState } from "react";

type ImageUploadContext = {
  imageUrlsState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
};

export const ImageUploadContext = createContext<ImageUploadContext | undefined>(
  undefined
);

type ImageUploadProviderProps = {
  children: React.ReactNode;
  imageUrls?: string[];
};
export const ImageUploadProvider = ({
  children,
  imageUrls,
}: ImageUploadProviderProps) => {
  console.log("imageUrls", imageUrls);
  const imageUrlsState = useState<string[]>(imageUrls || []);

  return (
    <ImageUploadContext.Provider value={{ imageUrlsState }}>
      {children}
    </ImageUploadContext.Provider>
  );
};

export const useImageUrlsState = () => {
  const value = useContext(ImageUploadContext);
  if (value === undefined) {
    throw new Error("Did not set initail ImageUploadContext value");
  }
  return value.imageUrlsState;
};

export const useImageUploadContext = () => {
  return useContext(ImageUploadContext);
};
