import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import { CommonSpace } from "../../commonStyles/CommonSpace";
import DrawArea from "./DrawArea";
import LiveChat from "./LiveChat";

export const RoomPage = (): JSX.Element => {
  const { roomId } = useParams();

  return (
    <RoomPageContainer>
      <DrawArea />
      <LiveChat />
    </RoomPageContainer>
  );
};

const RoomPageContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  display: "grid",
  gridTemplateColumns: "auto 360px",
}));

export default RoomPage;
