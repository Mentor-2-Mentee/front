import { Box } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { chatSocketQueryClient } from "../../../hooks/queries/liveChat";
import { LiveChat as LiveChatBaseComponent } from "../../RoomPage/LiveChat";

export const LiveChat = () => {
  return (
    <Box
      sx={(theme) => ({
        height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(17)} )`,
      })}
    >
      <QueryClientProvider client={chatSocketQueryClient}>
        <LiveChatBaseComponent fullWidth fullHeight nonHeader />
      </QueryClientProvider>
    </Box>
  );
};

export default LiveChat;
