import { Tab, Tabs, Typography } from "@mui/material";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RoomMode } from "..";
import { RootContext } from "../../../hooks/context/RootContext";
import { useContext } from "react";
import { userGradeCheck } from "../../../utils/userGradeCheck";
import { ExamReviewRoom } from "../../../hooks/queries/examReviewRoom";

interface TopBarProps {
  useRoomModeState: [RoomMode, React.Dispatch<React.SetStateAction<RoomMode>>];
  roomData: ExamReviewRoom;
}
export const TopBar = ({ useRoomModeState, roomData }: TopBarProps) => {
  const { userGrade } = useContext(RootContext);
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
        {`${roomData.examOrganizer} ${roomData.examType}`}
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
        <Tab value="submit" label="문제 제출" />
        <Tab value="question" label="문제 입력" />
        <Tab value="chat" label="실시간 채팅" />
        {userGradeCheck(["master", "admin"], userGrade) ? (
          <Tab value="setQuestionOption" label="문제 세부 설정" />
        ) : null}
        <Tab value="pdfDownload" label="PDF로 다운로드" />
        <Tab value="userList" label="참가자 확인" />
      </Tabs>
    </>
  );
};

export default TopBar;
