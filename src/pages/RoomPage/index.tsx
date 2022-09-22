import { Box, useMediaQuery } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { chatSocketQueryClient } from "../../hooks/queries/liveChat";
import DrawArea from "./DrawArea";
import LiveChat from "./LiveChat";

export const RoomPage = (): JSX.Element => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  return (
    <Box
      sx={(theme) => ({
        margin: theme.spacing(1),
        display: "flex",
        flexFlow: isWidthShort ? "column" : "row",
        "& > div": {
          marginBottom: isWidthShort ? 1 : "none",
          marginRight: isWidthShort ? "none" : 1,
        },
      })}
    >
      <DrawArea />
      <QueryClientProvider client={chatSocketQueryClient}>
        <LiveChat />
      </QueryClientProvider>
    </Box>
  );
};

export default RoomPage;
