import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AxiosRequestConfig } from "axios";
import ReactQuill, { QuillOptions } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
ReactQuill.Quill.register("modules/imageDrop", ImageDrop);
import ImageResize from "quill-image-resize";
ReactQuill.Quill.register("modules/ImageResize", ImageResize);

import axiosInstance from "../../api/axiosInstance";

interface MarkupEditerProps {
  usePostState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const quillOptions: QuillOptions = {
  modules: {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["formula"],
        ["image"],
        [{ align: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
      ],
    },
    imageDrop: true,
    ImageResize: {
      parchment: ReactQuill.Quill.import("parchment"),
    },
  },
};

export const MarkupEditer = ({ usePostState }: MarkupEditerProps) => {
  const [post, setPost] = usePostState;
  const quillRef = useRef<ReactQuill>(null);
  const [toolbarHeight, setToolbarHeight] = useState<number>(88);
  const editerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quillRef.current) return;

    const handleImage = () => {
      const input = document.createElement("input");
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        var file: File | null = input && input.files ? input.files[0] : null;
        var formData = new FormData();

        if (!file) return;

        formData.append("image[]", file, file.name);

        const res = await axiosInstance(config).post("/images", formData);
        const data = res.data.url[0];
        const range = quillRef.current!.getEditor().getSelection(true);
        quillRef.current!.getEditor().insertEmbed(range.index, "image", data);
      };
    };
    const toolbar = quillRef.current.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleImage);

    const imageDrop = quillRef.current.getEditor().getModule("imageDrop");
    const submitImage = async (file: File) => {
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var formData = new FormData();
      formData.append("image[]", file, file.name);
      const res = await axiosInstance(config).post("/images", formData);
      const data = res.data.url[0];
      const range = quillRef.current!.getEditor().getSelection(true);
      quillRef.current!.getEditor().insertEmbed(range.index, "image", data);
    };
    imageDrop.readFiles = (files: File[], callback: Function) => {
      submitImage(files[0]);
    };
  }, [quillRef.current]);

  const resetToolbarHeight = useCallback(() => {
    if (!quillRef.current) return;
    setToolbarHeight(
      quillRef.current.getEditor().getModule("toolbar").container.clientHeight
    );
  }, [quillRef.current]);

  useEffect(() => {
    window.addEventListener("resize", resetToolbarHeight);
    return () => {
      window.removeEventListener("resize", resetToolbarHeight);
    };
  }, [resetToolbarHeight]);

  return (
    <div ref={editerContainerRef} style={{ height: "85%" }}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={post}
        onChange={setPost}
        modules={quillOptions.modules}
        style={{
          width: "100%",
          height: `calc(100% - ${toolbarHeight}px)`,
        }}
      />
    </div>
  );
};

export default MarkupEditer;
