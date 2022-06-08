import { styled } from "@mui/system";
import Canvas from "./Canvas";
import CanvasOption from "./CanvasOption";

export const DrawArea = (): JSX.Element => {
  return (
    <DrawAreaContainer>
      <CanvasOption />
      <Canvas />
    </DrawAreaContainer>
  );
};

const DrawAreaContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: "green",
  height: "auto",
}));

export default DrawArea;
