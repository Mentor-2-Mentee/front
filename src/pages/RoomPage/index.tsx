import { styled } from "@mui/system";
import { QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { chatSocketQueryClient } from "../../hooks/queries/queryClientInit";
import DrawArea from "./DrawArea";
import LiveChat from "./LiveChat";

export const RoomPage = (): JSX.Element => {
  const { roomId } = useParams();

  return (
    <RoomPageContainer>
      <DrawArea />
      <QueryClientProvider client={chatSocketQueryClient}>
        <LiveChat />
      </QueryClientProvider>
    </RoomPageContainer>
  );
};

const RoomPageContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  display: "flex",
  justifyContent: "row",
  minWidth: theme.spacing(40),
  maxHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(10.5)})`,
}));

export default RoomPage;
