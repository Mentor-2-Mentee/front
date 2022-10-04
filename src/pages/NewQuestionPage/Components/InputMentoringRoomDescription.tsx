import { Box, TextField } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import ReactQuill, { QuillOptions, Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../../api/axiosInstance";
import { AxiosRequestConfig } from "axios";

interface InputMentoringRoomDescriptionProps {
  useMentoringRoomDescriptionState: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
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
      // handlers: {
      //   image: imageHandler,
      // },
    },
  },
};

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
      [{ align: [] }],
    ],
    // 'handlers': {
    //    image: imageHandler
    // }
  },
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    // parchment: Quill.import('parchment'),
    modules: ["Resize", "DisplaySize"],
  },
};

export const InputMentoringRoomDescription = ({
  useMentoringRoomDescriptionState,
}: InputMentoringRoomDescriptionProps): JSX.Element => {
  const [mentoringRoomDescription, setMentoringRoomDescription] =
    useMentoringRoomDescriptionState;

  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (quillRef.current) {
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
    }
  }, [quillRef.current]);

  return (
    <Box sx={{ height: 500, mb: 2 }}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={mentoringRoomDescription}
        onChange={setMentoringRoomDescription}
        modules={quillOptions.modules}
        style={{
          height: "calc(100% - 75px)",
        }}
      />
    </Box>
  );
};
