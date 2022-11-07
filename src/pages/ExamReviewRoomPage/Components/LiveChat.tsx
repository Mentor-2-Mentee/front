import { Box } from "@mui/material";
import { LiveChat as LiveChatBaseComponent } from "../../RoomPage/LiveChat";

export const LiveChat = () => {
  return (
    <Box
      sx={(theme) => ({
        height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(17)} )`,
      })}
    >
      <LiveChatBaseComponent fullWidth fullHeight nonHeader />
    </Box>
  );
};

export default LiveChat;
