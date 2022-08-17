import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { SignatureColor } from "../commonStyles/CommonColor";

import { useEffect, useState } from "react";
import useDragDrop from "../pages/CreateRoomPage/useDragDrop";
import handleImageFile from "../pages/CreateRoomPage/handleImageFile";
import { useSnackbar } from "notistack";
import React from "react";
import FileDragDropArea from "../pages/CreateRoomPage/FileDragDropArea";

export type ImageFile = {
  fileName: string;
  fileData: File;
  imageURL: string;
};

interface ImageUploadProps {
  imageFileList: ImageFile[];
  setImageFileList: React.Dispatch<React.SetStateAction<ImageFile[]>>;
}

export const ImageUpload = ({
  imageFileList,
  setImageFileList,
}: ImageUploadProps): JSX.Element => {
  const [isDrag, setIsDrag] = useState<boolean>(false);
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
        <Typography variant="subtitle1">사진 업로드</Typography>
        <label htmlFor="imageUpload">
          <Button component="span" variant="contained">
            Upload
          </Button>
        </label>
      </ImageUploadHeader>
      <label htmlFor="imageUpload" ref={dragDropRef}>
        <FileDragDropArea
          isDrag={isDrag}
          imageFileList={imageFileList}
          setImageFileList={setImageFileList}
        />
      </label>
      <Typography
        sx={(theme) => ({
          color: SignatureColor.BLACK_50,
          padding: theme.spacing(0, 0, 1, 2),
        })}
      >
        <span>&#8251;</span>
        음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의
        책임을 질 수 있습니다.
      </Typography>
    </ImageUploadContainer>
  );
};

const ImageUploadContainer = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  borderRadius: theme.spacing(1),
}));

const ImageUploadHeader = styled("div")(({ theme }) => ({
  height: theme.spacing(6),
  // background: SignatureColor.GRAY,
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
