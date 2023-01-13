import { styled } from "@mui/system";

import { SignatureColor } from "../../commonStyles/CommonColor";
import EmptyImagesArea from "./EmptyImagesArea";
import { useImageUrlsState } from "./hook/ImageUploadContext";
import ThumbnailImages from "./ThumbnailImages";

interface FileDragDropAreaProps {
  isDrag: boolean;
  // imageUrls: string[];
  // useImageUrlState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}

export const FileDragDropArea = ({
  isDrag,
}: // imageUrls,
FileDragDropAreaProps): JSX.Element => {
  const [imageUrls, _] = useImageUrlsState();

  console.log("123", imageUrls);

  return (
    <FileDragDropAreaContainer
      sx={{
        filter: isDrag ? "blur(3px)" : "none",
      }}
    >
      {imageUrls.length === 0 ? <EmptyImagesArea /> : <ThumbnailImages />}
    </FileDragDropAreaContainer>
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

export default FileDragDropArea;
