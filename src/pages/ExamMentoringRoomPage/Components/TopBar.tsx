import { Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RoomMode } from "..";
import { useParams } from "react-router";
import { ExamMentoringRoom } from "../../../hooks/queries/examSchedule";

interface TopBarProps {
  useRoomModeState: [RoomMode, React.Dispatch<React.SetStateAction<RoomMode>>];
  roomData: ExamMentoringRoom;
}
export const TopBar = ({ useRoomModeState, roomData }: TopBarProps) => {
  const [roomMode, setRoomMode] = useRoomModeState;
  const handleTabClick = (event: React.SyntheticEvent, newMode: RoomMode) =>
    setRoomMode(newMode);

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
      </Typography>
      <Tabs
        value={roomMode}
        onChange={handleTabClick}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
        sx={{
          borderBottom: `1px solid ${SignatureColor.BLACK_80}`,
          backgroundColor: SignatureColor.GRAY,
        }}
      >
        <Tab value="question" label="문제 입력" />
        <Tab value="chat" label="실시간 채팅" />
        <Tab value="setQuestions" label="문제수 설정" />
        <Tab value="pdfDownload" label="PDF로 다운로드" />
        <Tab value="userList" label="참가자 확인" />
      </Tabs>
    </>
  );
};

export default TopBar;
