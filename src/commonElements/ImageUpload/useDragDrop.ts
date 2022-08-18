import { useSnackbar } from "notistack";
import React from "react";
import { useCallback, useEffect, useRef } from "react";
import { ImageFile } from ".";
import { handleImageFile } from "./handleImageFile";

interface UseDragDropParams {
  setIsDrag: React.Dispatch<React.SetStateAction<boolean>>;
  setImageFileList: React.Dispatch<React.SetStateAction<ImageFile[]>>;
}

export const useDragDrop = ({
  setIsDrag,
  setImageFileList,
}: UseDragDropParams): React.MutableRefObject<HTMLLabelElement | null> => {
  const dragDropRef = useRef<HTMLLabelElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  //drag in 왜써야하지??
  const handleDragIn = useCallback((event: DragEvent): void => {
    // event.preventDefault();
    // event.stopPropagation();
  }, []);

  const handleDragOut = useCallback((event: DragEvent): void => {
    setIsDrag(false);
  }, []);

  const handleDragOver = useCallback((event: DragEvent): void => {
    event.preventDefault();

    if (event.dataTransfer!.files) {
      setIsDrag(true);
    }
  }, []);

  const handleDrop = useCallback(
    async (event: DragEvent): Promise<void> => {
      event.preventDefault();

      if (event.dataTransfer === null) return;

      const rawFiles = event.dataTransfer.files;

      for (const rawFile of rawFiles) {
        try {
          await handleImageFile({
            rawImageFile: rawFile,
            afterLoadCallBack: setImageFileList,
          });
        } catch (error) {
          console.log(`image read error : ${error}`);
          enqueueSnackbar(`이미지 "${rawFile.name}"을 불러오지 못했습니다.`, {
            variant: "error",
          });
        }
      }

      setIsDrag(false);
    },
    [handleImageFile]
  );

  const injectEvents = useCallback((): void => {
    if (dragDropRef.current === null) return;
    dragDropRef.current.addEventListener("dragenter", handleDragIn);
    dragDropRef.current.addEventListener("dragleave", handleDragOut);
    dragDropRef.current.addEventListener("dragover", handleDragOver);
    dragDropRef.current.addEventListener("drop", handleDrop);
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const cleanUpEvents = useCallback((): void => {
    if (dragDropRef.current === null) return;
    dragDropRef.current.removeEventListener("dragenter", handleDragIn);
    dragDropRef.current.removeEventListener("dragleave", handleDragOut);
    dragDropRef.current.removeEventListener("dragover", handleDragOver);
    dragDropRef.current.removeEventListener("drop", handleDrop);
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    injectEvents();
    return () => {
      cleanUpEvents();
    };
  }, [injectEvents, cleanUpEvents]);

  return dragDropRef;
};
