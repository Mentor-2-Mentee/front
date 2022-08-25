import { styled } from "@mui/system";
import { QueryClientProvider } from "react-query";
import { chatSocketQueryClient } from "../../hooks/queries/liveChat";
import LiveChat from "../RoomPage/LiveChat";

export const TestMentoringRoomPage = (): JSX.Element => {
  return (
    <TestMentoringRoomContainer>
      <div>시험관련 질의응답방</div>
      <QueryClientProvider client={chatSocketQueryClient}>
        <LiveChat />
      </QueryClientProvider>
    </TestMentoringRoomContainer>
  );
};

const TestMentoringRoomContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  display: "flex",
  justifyContent: "row",
  minWidth: theme.spacing(40),
  maxHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(10.5)})`,
}));

export default TestMentoringRoomPage;
