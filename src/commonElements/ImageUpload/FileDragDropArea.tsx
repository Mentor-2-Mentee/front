import { styled } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface FileDragDropAreaProps {
  isDrag: boolean;
  useImageUrlState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}

export const FileDragDropArea = ({
  isDrag,
  useImageUrlState,
}: FileDragDropAreaProps): JSX.Element => {
  const [imageUrl, setImageUrl] = useImageUrlState;
  return (
    <FileDragDropAreaContainer
      sx={{
        filter: isDrag ? "blur(3px)" : "none",
      }}
    >
      {imageUrl.length === 0 ? (
        <EmptyImagesArea />
      ) : (
        <ThumbnailImages useImageUrlState={useImageUrlState} />
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
  useImageUrlState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}
const ThumbnailImages = ({
  useImageUrlState,
}: ThumbnailImagesProps): JSX.Element => {
  const [imageUrl, setImageUrl] = useImageUrlState;
  const deleteTargetImage = (targetIndex: number) => () => {
    setImageUrl((currentList) => {
      return currentList.filter((_, index) => index !== targetIndex);
    });
  };

  return (
    <ThumbnailImagesContainer>
      {imageUrl.map((url, index) => {
        return (
          <ThumbnailImageElementContainer
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <ThumbnailImage src={url} alt={url} />
            <ThumbnailImageHandler>
              <ThumbnailImageIndex>{index + 1}</ThumbnailImageIndex>
              <Button
                variant="contained"
                color="error"
                size="small"
                // defaultValue={imageFile.fileName}
                endIcon={<DeleteIcon />}
                sx={{
                  position: "absolute",
                  top: 0.5,
                  left: 55,
                  display: "none",
                }}
                onClick={deleteTargetImage(index)}
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

const ThumbnailImageElementContainer = styled("div")(({}) => ({
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
