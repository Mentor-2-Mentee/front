import { Box, useMediaQuery } from "@mui/material";
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
      <LiveChat />
    </Box>
  );
};

export default RoomPage;
