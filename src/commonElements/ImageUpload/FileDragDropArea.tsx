import { styled } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ImageFile } from ".";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface FileDragDropAreaProps {
  isDrag: boolean;
  imageFileList: ImageFile[];
  setImageFileList: React.Dispatch<React.SetStateAction<ImageFile[]>>;
}

export const FileDragDropArea = ({
  isDrag,
  imageFileList,
  setImageFileList,
}: FileDragDropAreaProps): JSX.Element => {
  return (
    <FileDragDropAreaContainer
      sx={{
        filter: isDrag ? "blur(3px)" : "none",
      }}
    >
      {imageFileList.length === 0 ? (
        <EmptyImagesArea />
      ) : (
        <ThumbnailImages
          imageFileList={imageFileList}
          setImageFileList={setImageFileList}
        />
      )}
    </FileDragDropAreaContainer>
  );
};

const EmptyImagesArea = (): JSX.Element => {
  return (
    <Box
      sx={{ p: 2, display: "flex", flexFlow: "column", alignItems: "center" }}
    >
      <AddPhotoAlternateIcon sx={{ fontSize: 50 }} />
      <Typography variant="subtitle1">
        {"이미지를 드래그&드롭으로 이곳에 올려주세요."}
      </Typography>
      <Typography variant="subtitle1">
        {"첫번째 이미지가 대표 이미지로 노출됩니다."}
      </Typography>
    </Box>
  );
};

interface ThumbnailImagesProps {
  imageFileList: ImageFile[];
  setImageFileList: React.Dispatch<React.SetStateAction<ImageFile[]>>;
}
const ThumbnailImages = ({
  imageFileList,
  setImageFileList,
}: ThumbnailImagesProps): JSX.Element => {
  const deleteTargetImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetImageName =
      event.currentTarget.parentElement?.parentElement?.getElementsByTagName(
        "img"
      )[0].alt;
    setImageFileList((currentList) => {
      return currentList.filter(
        (element) => element.fileName !== targetImageName
      );
    });
  };

  return (
    <ThumbnailImagesContainer>
      {imageFileList.map((imageFile, index) => {
        return (
          <ThumbnailImageElementContainer
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <ThumbnailImage src={imageFile.imageURL} alt={imageFile.fileName} />
            <ThumbnailImageHandler>
              <ThumbnailImageIndex>{index + 1}</ThumbnailImageIndex>
              <Button
                variant="contained"
                color="error"
                size="small"
                defaultValue={imageFile.fileName}
                endIcon={<DeleteIcon />}
                sx={{
                  position: "absolute",
                  top: 0.5,
                  left: 55,
                  display: "none",
                }}
                onClick={deleteTargetImage}
              >
                DELETE
              </Button>
            </ThumbnailImageHandler>
          </ThumbnailImageElementContainer>
        );
      })}
    </ThumbnailImagesContainer>
  );
};

const FileDragDropAreaContainer = styled("div")(({ theme }) => ({
  minHeight: theme.spacing(20),
  background: SignatureColor.GRAY_BORDER,
  border: `1px dashed ${SignatureColor.BLACK_50}`,
  borderRadius: theme.spacing(2),
  margin: theme.spacing(0.5, 2, 1, 2),

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexFlow: "column",
}));

const ThumbnailImagesContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",

  "& > *": {
    margin: theme.spacing(2),
  },
}));

const ThumbnailImageElementContainer = styled("div")(({ theme }) => ({
  position: "relative",

  "&:hover": {
    "& > * > button": {
      display: "inline-flex",
    },
  },
}));

const ThumbnailImage = styled("img")(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
}));

const ThumbnailImageHandler = styled("div")(({ theme }) => ({
  width: theme.spacing(20),
  position: "absolute",
  transform: `translate(${theme.spacing(0.5)},-${theme.spacing(20)})`,
}));

const ThumbnailImageIndex = styled("div")(({ theme }) => ({
  background: SignatureColor.WHITE,
  border: `1px solid ${SignatureColor.BLACK_50}`,
  width: theme.spacing(2),
  height: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default FileDragDropArea;
