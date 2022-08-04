import { styled } from "@mui/system";
import { useEffect } from "react";
import { QueryClientProvider } from "react-query";
import { useParams } from "react-router-dom";
import { CommonSpace } from "../../commonStyles/CommonSpace";
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
}));

export default RoomPage;
