import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { SignatureColor } from "../../commonStyles/CommonColor";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import useDragDrop from "./useDragDrop";
import handleImageFile from "./handleImageFile";
import { useSnackbar } from "notistack";
import React from "react";

export type ImageFile = {
  fileName: string;
  fileData: File;
  imageURL: string;
};

export const ImageUpload = (): JSX.Element => {
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [imageFileList, setImageFileList] = useState<ImageFile[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const dragDropRef = useDragDrop({
    setIsDrag,
    setImageFileList,
  });

  const handleUploadButtonClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.target.files === null) return;

    const rawFiles = event.target.files;

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
  };

  useEffect(() => {
    console.log(imageFileList);
  }, [imageFileList]);

  return (
    <ImageUploadContainer>
      <ImageUploadInput
        accept="image/*"
        name="imageUpload"
        id="imageUpload"
        multiple
        type="file"
        onChange={handleUploadButtonClick}
      />

      <ImageUploadHeader>
        문제 사진 업로드
        <label htmlFor="imageUpload">
          <Button component="span" variant="contained">
            Upload
          </Button>
        </label>
      </ImageUploadHeader>
      <label htmlFor="imageUpload" ref={dragDropRef}>
        <FileDragDropArea
          sx={{
            filter: isDrag ? "blur(3px)" : "none",
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: 50 }} />
          <div>{"이미지를 드래그&드롭으로 이곳에 올려주세요."}</div>
          <div>
            {imageFileList.map((imageFile) => {
              return <img src={imageFile.imageURL} alt={imageFile.fileName} />;
            })}
          </div>
        </FileDragDropArea>
      </label>
      <Typography sx={{ color: SignatureColor.BLACK_50 }}>
        <span>&#8251;</span>
        음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의
        책임을 질 수 있습니다.
      </Typography>
    </ImageUploadContainer>
  );
};

const ImageUploadContainer = styled("div")(({ theme }) => ({}));

const ImageUploadHeader = styled("div")(({ theme }) => ({
  height: theme.spacing(6),
  background: SignatureColor.GRAY,
  paddingLeft: theme.spacing(2),
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

const FileDragDropArea = styled("div")(({ theme }) => ({
  height: theme.spacing(20),
  background: SignatureColor.GRAY_BORDER,
  marginTop: theme.spacing(0.5),
  border: `1px dashed ${SignatureColor.BLACK_50}`,
  borderRadius: theme.spacing(2),

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexFlow: "column",
}));

export default ImageUpload;
