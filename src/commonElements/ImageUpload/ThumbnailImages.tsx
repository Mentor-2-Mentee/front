import { styled } from "@mui/system";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useImageUrlsState } from "./hook/ImageUploadContext";

interface ThumbnailImagesProps {
  //   imageUrls: string[];
  //   useImageUrlState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}
const ThumbnailImages = ({}: //   useImageUrlState,
ThumbnailImagesProps): JSX.Element => {
  //   const [imageUrl, setImageUrl] = useImageUrlState;
  const [imageUrls, setImageUrls] = useImageUrlsState();
  const deleteTargetImage = (targetIndex: number) => () => {
    setImageUrls((currentList) => {
      return currentList.filter((_, index) => index !== targetIndex);
    });
  };

  console.log("기존 이미지들", imageUrls);

  return (
    <ThumbnailImagesContainer>
      {imageUrls.map((url, index) => {
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

export default ThumbnailImages;
