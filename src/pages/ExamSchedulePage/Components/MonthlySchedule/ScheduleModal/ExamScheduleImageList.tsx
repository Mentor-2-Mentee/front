import { styled } from "@mui/system";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";

interface ExamScheduleImageListProps {
  imageUrlList: string[];
}

export const ExamScheduleImageList = ({
  imageUrlList,
}: ExamScheduleImageListProps): JSX.Element => {
  return (
    <ImageListRowContainer>
      {imageUrlList.length === 0 ? (
        <div>{null}</div>
      ) : (
        <>
          {imageUrlList.map((url) => {
            return <Img src={url} />;
          })}
        </>
      )}
    </ImageListRowContainer>
  );
};

const ImageListRowContainer = styled("div")(({}) => ({
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,
}));

const Img = styled("img")(({}) => ({
  width: "100%",
}));

export default ExamScheduleImageList;
