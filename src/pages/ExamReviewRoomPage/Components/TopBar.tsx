import {
  Box,
  CircularProgress,
  SxProps,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useGetExamReviewRoomQuery } from "../../../hooks/queries/examReviewRoom";
import { useNavigate, useParams } from "react-router";
import { useGetUserListQuery } from "../../../hooks/queries/examReviewRoomUser";
import { getCookieValue } from "../../../utils";
import { useEffect } from "react";
import BlockIcon from "@mui/icons-material/Block";

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
  const navigation = useNavigate();
  const [roomMode, setRoomMode] = useRoomModeState;
  const handleTabClick = (event: React.SyntheticEvent, newMode: RoomMode) =>
    setRoomMode(newMode);

  const examReviewRoomId = Number(useParams().examReviewRoomId);
  const { data: examReviewRoomData, status: examReviewRoomQueryStatus } =
    useGetExamReviewRoomQuery({
      examReviewRoomId,
    });

  const { data: userListData, status: userListQueryStatus } =
    useGetUserListQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId,
    });

  useEffect(() => {
    navigation(`#${roomMode}`);
  }, [roomMode]);

  if (examReviewRoomQueryStatus === "loading") {
    return <CircularProgress />;
  }
  if (examReviewRoomQueryStatus === "error") {
    return <div>Error</div>;
  }

  const userCount =
    userListQueryStatus !== "success"
      ? "-"
      : String(userListData.userList.length);

  return (
    <>
      <Box sx={RoomHeaderSxProps}>
        <Typography variant="h6" sx={{ mr: 1 }}>
          {`${examReviewRoomData.examOrganizer} ${examReviewRoomData.examType}`}
        </Typography>
        {examReviewRoomData.isRestricted ? (
          <>
            <BlockIcon sx={{ mr: 1, color: SignatureColor.RED }} />
            <Typography>{`입장코드: ${examReviewRoomData.enterCode}`}</Typography>
          </>
        ) : null}
      </Box>

      <Tabs
        value={roomMode}
        onChange={handleTabClick}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          borderBottom: `1px solid ${SignatureColor.BLACK_80}`,
          backgroundColor: SignatureColor.GRAY,
          minHeight: "unset",
        }}
      >
        {ROOM_MODE.map(({ value, label }) => {
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
  pt: 0.5,
  pl: 2,
  display: "flex",
  alignItems: "center",

  backgroundColor: SignatureColor.GRAY,
};

export default TopBar;
