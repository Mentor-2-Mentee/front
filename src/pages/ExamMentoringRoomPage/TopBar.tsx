import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RoomMode } from ".";

interface TopBarProps {
  useRoomModeState: [RoomMode, React.Dispatch<React.SetStateAction<RoomMode>>];
}
export const TopBar = ({ useRoomModeState }: TopBarProps) => {
  const [roomMode, setRoomMode] = useRoomModeState;

  const hanldleRoomModeButton = () => {
    if (roomMode === "chat") {
      setRoomMode("question");
      return;
    }
    setRoomMode("chat");
  };

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          pt: 1,
          pl: 1,
          pr: 1,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: SignatureColor.GRAY,
        }}
      >
        서울교통공사 화공직
        <Button
          size="small"
          variant="contained"
          onClick={hanldleRoomModeButton}
        >
          {roomMode === "question" ? "채팅방" : "문제확인방"}
        </Button>
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
        sx={{
          borderBottom: `1px solid ${SignatureColor.BLACK_80}`,
          backgroundColor: SignatureColor.GRAY,
        }}
      >
        <Tab label="문제수 설정" />
        <Tab label="PDF로 다운로드" />
        {/* <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" /> */}
      </Tabs>
    </>
  );
};

export default TopBar;
