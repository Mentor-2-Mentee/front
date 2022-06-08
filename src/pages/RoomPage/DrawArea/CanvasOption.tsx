import { styled } from "@mui/system";

export const CanvasOption = (): JSX.Element => {
  return (
    <CanvasOptionContainer>
      <div>여기는 켄버스 옵션들 오는곳</div>
    </CanvasOptionContainer>
  );
};

const CanvasOptionContainer = styled("div")(({ theme }) => ({}));

export default CanvasOption;
