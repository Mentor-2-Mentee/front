import { useCallback, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { useSnackbar } from "notistack";
import { useDragDrop } from "./useDragDrop";
import FileDragDropArea from "./FileDragDropArea";
import { usePostImageMutation } from "../../hooks/queries/images/usePostImageMutation";
import { getCookieValue } from "../../utils";
import { ImageUploadProvider } from "./hook/ImageUploadContext";

export type ImageFile = {
  fileName: string;
  fileData: File;
  localImageUrl: string;
};

interface ImageUploadProps {
  imageUrls: string[];
  dispatcher: (imageUrls: string[]) => void;
  multipleUpload?: boolean;
}

export const ImageUpload = ({
  imageUrls,
  dispatcher: imageUrlDispatcher,
  multipleUpload = false,
}: ImageUploadProps): JSX.Element => {
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const postImageMutation = usePostImageMutation(
    imageUrls,
    imageUrlDispatcher,
    enqueueSnackbar
  );

  const postImageCallBack = useCallback(
    (imageFileList: FileList) => {
      postImageMutation.mutate({
        token: getCookieValue("accessToken"),
        imageFileList,
      });
    },
    [postImageMutation]
  );

  const dragDropRef = useDragDrop({
    setIsDrag,
    postImageCallBack,
  });

  const handleUploadButtonClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files === null || event.target.files.length === 0) return;
    const imageFileList = event.target.files;
    postImageCallBack(imageFileList);
  };

  return (
    <ImageUploadProvider imageUrls={imageUrls}>
      <ImageUploadContainer>
        <ImageUploadInput
          accept="image/*"
          name="imageUpload"
          id="imageUpload"
          type="file"
          multiple={multipleUpload}
          onChange={handleUploadButtonClick}
        />

        <ImageUploadHeader>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            사진 업로드
          </Typography>
          <label htmlFor="imageUpload">
            <Button component="span" variant="contained">
              사진 선택
            </Button>
          </label>
        </ImageUploadHeader>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: `${document.body.clientHeight}px`,
          }}
          ref={dragDropRef}
        />
        <label htmlFor="imageUpload">
          <FileDragDropArea isDrag={isDrag} />
        </label>
        <Typography
          sx={(theme) => ({
            color: SignatureColor.BLACK_50,
            padding: theme.spacing(2),
          })}
        >
          <span>&#8251;</span>
          음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의
          책임을 질 수 있습니다.
        </Typography>
      </ImageUploadContainer>
    </ImageUploadProvider>
  );
};

const ImageUploadContainer = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  borderRadius: theme.spacing(1),
}));

const ImageUploadHeader = styled("div")(({ theme }) => ({
  height: theme.spacing(6),
  padding: theme.spacing(1, 0, 1, 2),
  borderRadius: theme.spacing(0.5),

  display: "flex",
  alignItems: "center",

  "& > *": {
    paddingLeft: theme.spacing(2),
  },
}));

const ImageUploadInput = styled("input")({
  display: "none",
});

export default ImageUpload;
