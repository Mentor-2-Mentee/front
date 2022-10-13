import React from "react";
import { useCallback, useEffect, useRef } from "react";

interface UseDragDropParams {
  setIsDrag: React.Dispatch<React.SetStateAction<boolean>>;
  postImageCallBack: (imageFileList: FileList) => void;
}

export const useDragDrop = ({
  setIsDrag,
  postImageCallBack,
}: UseDragDropParams): React.MutableRefObject<HTMLLabelElement | null> => {
  const dragDropRef = useRef<HTMLLabelElement>(null);

  const handleDragOut = useCallback((event: DragEvent): void => {
    setIsDrag(false);
  }, []);

  const handleDragOver = useCallback((event: DragEvent): void => {
    event.preventDefault();
    if (event.dataTransfer!.files) {
      setIsDrag(true);
    }
  }, []);

  const handleDropFile = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      if (event.dataTransfer === null) return;
      if (event.dataTransfer.files.length === 0) return;
      const draggedImageFiles = event.dataTransfer.files;
      postImageCallBack(draggedImageFiles);
      setIsDrag(false);
    },
    [postImageCallBack]
  );

  useEffect(() => {
    if (dragDropRef.current === null) return;
    dragDropRef.current.addEventListener("dragleave", handleDragOut);
    dragDropRef.current.addEventListener("dragover", handleDragOver);
    dragDropRef.current.addEventListener("drop", handleDropFile);
    return () => {
      if (dragDropRef.current === null) return;
      dragDropRef.current.removeEventListener("dragleave", handleDragOut);
      dragDropRef.current.removeEventListener("dragover", handleDragOver);
      dragDropRef.current.removeEventListener("drop", handleDropFile);
    };
  }, [dragDropRef.current, handleDragOut, handleDragOver, handleDropFile]);

  return dragDropRef;
};
