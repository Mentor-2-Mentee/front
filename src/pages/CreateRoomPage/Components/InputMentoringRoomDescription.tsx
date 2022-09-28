import { Box, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import ReactQuill, { QuillOptions, Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface InputMentoringRoomDescriptionProps {
  useMentoringRoomDescriptionState: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

const imageHandler = async () => {
  const input = document.createElement("input");

  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async () => {
    var file: any = input && input.files ? input.files[0] : null;
    console.log("uploaded file", file);
    var formData = new FormData();
    formData.append("file", file);

    // let quillObj = quillRef.current.getEditor();
    // await UploadService.uploadFile(formData)
    //     .then((res) => {
    //         let data = get(res, "data.data.url");
    //         const range = quillObj.getEditorSelection();
    //         quillObj.getEditor().insertEmbed(range.index, 'image', data);
    //     })
    //     .catch((err) => {
    //         message.error("This is an error message");
    //         return false;
    //     });
  };
};

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
      handlers: {
        image: imageHandler,
      },
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

  const quillRef = useRef(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const quill = new Quill(containerRef.current);
    quill.insertEmbed;
  });

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
