import {
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RoomMode } from ".";
import { useParams } from "react-router";
import {
  ExamMentoringRoom,
  useGetExamMentoringRoomListQuery,
} from "../../hooks/queries/examSchedule";

interface TopBarProps {
  useRoomModeState: [RoomMode, React.Dispatch<React.SetStateAction<RoomMode>>];
  roomData: ExamMentoringRoom;
}
export const TopBar = ({ useRoomModeState, roomData }: TopBarProps) => {
  const [roomMode, setRoomMode] = useRoomModeState;

  const { examScheduleId, examField } = useParams();

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

  console.log(roomData);

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
        {`${roomData.examScheduleTitle} ${roomData.examField}`}
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
        <Tab label="참여자 확인" />
        {/* <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" /> */}
      </Tabs>
    </>
  );
};

export default TopBar;
