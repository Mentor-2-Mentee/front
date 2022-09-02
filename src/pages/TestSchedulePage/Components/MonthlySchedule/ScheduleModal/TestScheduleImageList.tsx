import { styled } from "@mui/system";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";

interface TestScheduleImageListProps {
  imageUrlList: string[];
}

export const TestScheduleImageList = ({
  imageUrlList,
}: TestScheduleImageListProps): JSX.Element => {
  return (
    <ImageListRowContainer>
      {imageUrlList.length === 0 ? (
        <div>{null}</div>
      ) : (
        <>
          {imageUrlList.map((url) => {
            return <Img src={`${import.meta.env.VITE_APP_BASEURL}/${url}`} />;
          })}
        </>
      )}
    </ImageListRowContainer>
  );
};

const ImageListRowContainer = styled("div")(({ theme }) => ({
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,
}));

const Img = styled("img")(({ theme }) => ({
  width: "100%",
}));

export default TestScheduleImageList;
