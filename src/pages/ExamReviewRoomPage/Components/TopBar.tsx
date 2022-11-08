import {
  CircularProgress,
  SxProps,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import { useContext } from "react";
import { userGradeCheck } from "../../../utils/userGradeCheck";
import { useGetExamReviewRoomQuery } from "../../../hooks/queries/examReviewRoom";
import { useParams } from "react-router";
import { useGetUserListQuery } from "../../../hooks/queries/examReviewRoomUser";
import { getCookieValue } from "../../../utils";

export type RoomMode =
  | "submit"
  | "questions"
  | "chat"
  | "option"
  | "download"
  | "users";

const ROOM_MODE = [
  { label: "문제 제출", value: "submit" },
  { label: "문제 추합", value: "questions" },
  { label: "실시간 채팅", value: "chat" },
  { label: "다운로드", value: "download" },
  { label: "참가자", value: "users" },
  { label: "설정", value: "option" },
];

interface TopBarProps {
  useRoomModeState: [RoomMode, React.Dispatch<React.SetStateAction<RoomMode>>];
}
export const TopBar = ({ useRoomModeState }: TopBarProps) => {
  const { id, userGrade } = useContext(RootContext);
  const [roomMode, setRoomMode] = useRoomModeState;
  const handleTabClick = (event: React.SyntheticEvent, newMode: RoomMode) =>
    setRoomMode(newMode);

  const examReviewRoomId = Number(useParams().examReviewRoomId);
  const examReviewRoomQuery = useGetExamReviewRoomQuery({
    examReviewRoomId,
  });
  const { data: userListData, status: userListQueryStatus } =
    useGetUserListQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId,
    });

  if (examReviewRoomQuery.status === "loading") {
    return <CircularProgress />;
  }
  if (examReviewRoomQuery.status === "error") {
    return <div>Error</div>;
  }

  const userCount =
    userListQueryStatus !== "success"
      ? "-"
      : String(userListData.userList.length);

  return (
    <>
      <Typography variant="h5" sx={RoomHeaderSxProps}>
        {`${examReviewRoomQuery.data.examOrganizer} ${examReviewRoomQuery.data.examType}`}
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
        {ROOM_MODE.map(({ value, label }) => {
          // if (value === "option" && userGradeCheck(["user"], userGrade)) return;
          if (value === "users") {
            return (
              <Tab
                label={`${label} (${userCount})`}
                value={value}
                key={label}
              />
            );
          }
          return <Tab key={label} value={value} label={label} />;
        })}
      </Tabs>
    </>
  );
};

const RoomHeaderSxProps: SxProps = {
  pt: 1,
  pl: 1,
  pr: 1,
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: SignatureColor.GRAY,
};

export default TopBar;
