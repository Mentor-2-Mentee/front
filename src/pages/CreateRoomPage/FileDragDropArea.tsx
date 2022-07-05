import { styled } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ImageFile } from "./ImageUpload";
import { SignatureColor } from "../../commonStyles/CommonColor";

interface FileDragDropAreaProps {
  isDrag: boolean;
  imageFileList: ImageFile[];
}

export const FileDragDropArea = ({
  isDrag,
  imageFileList,
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
        <ThumbnailImages imageFileList={imageFileList} />
      )}
    </FileDragDropAreaContainer>
  );
};

const EmptyImagesArea = (): JSX.Element => {
  return (
    <>
      <AddPhotoAlternateIcon sx={{ fontSize: 50 }} />
      <div>{"이미지를 드래그&드롭으로 이곳에 올려주세요."}</div>
      <div>{"첫번째 이미지가 대표 이미지로 노출됩니다."}</div>
    </>
  );
};

interface ThumbnailImagesProps {
  imageFileList: ImageFile[];
}
const ThumbnailImages = ({
  imageFileList,
}: ThumbnailImagesProps): JSX.Element => {
  return (
    <ThumbnailImagesContainer>
      {imageFileList.map((imageFile) => {
        return (
          <ThumbnailImageElement
            src={imageFile.imageURL}
            alt={imageFile.fileName}
          />
        );
      })}
    </ThumbnailImagesContainer>
  );
};

const FileDragDropAreaContainer = styled("div")(({ theme }) => ({
  minHeight: theme.spacing(20),
  background: SignatureColor.GRAY_BORDER,
  marginTop: theme.spacing(0.5),
  border: `1px dashed ${SignatureColor.BLACK_50}`,
  borderRadius: theme.spacing(2),

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

const ThumbnailImageElement = styled("img")(({ theme }) => ({
  maxWidth: theme.spacing(15),
  flex: `1 1 25%`,
}));

export default FileDragDropArea;
