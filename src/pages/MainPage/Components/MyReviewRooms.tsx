import {
  Box,
  Button,
  CircularProgress,
  Typography,
  SxProps,
} from "@mui/material";
import { useNavigate } from "react-router";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useGetUserExamReviewRoomListQuery } from "../../../hooks/queries/userProfile/useGetUserExamReviewRoomListQuery";
import { getCookieValue } from "../../../utils";

export const MyReviewRooms = (): JSX.Element => {
  const navigation = useNavigate();
  const { data: roomListData, status: roomListQueryStatus } =
    useGetUserExamReviewRoomListQuery({
      token: getCookieValue("accessToken"),
    });

  const handleRoomElementClick = (roomId: number) => () => {
    navigation(`/exam-review-room/${roomId}`);
  };

  if (roomListQueryStatus === "loading") return <CircularProgress />;
  if (roomListQueryStatus === "error") return <div>error</div>;

  return (
    <Box>
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: "bold", ml: 1, mb: 1 }}
      >
        {`참여중인 시험 리뷰 (${roomListData.examReviewRoomList.length})`}
      </Typography>

      <Box sx={RoomGridBoxSxProps}>
        {roomListData.examReviewRoomList.slice(0, 5).map((room) => {
          return (
            <Button
              sx={RoomElementButtonSxProps}
              onClick={handleRoomElementClick(room.id)}
            >
              <Typography fontWeight={"bold"} color={SignatureColor.BLACK_80}>
                {`${room.organizer} ${room.examType}`}
              </Typography>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

const RoomGridBoxSxProps: SxProps = {
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,
  borderRadius: 2,
  margin: 1,

  display: "grid",
  gridTemplateColumns: "repeat(2, 50%)",
};

const RoomElementButtonSxProps: SxProps = {
  display: "flex",
  backgroundColor: SignatureColor.GRAY,
  borderRadius: 1,
  m: 1,
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",

  "&:hover": {
    boxShadow: `0 0 0 1px ${SignatureColor.BLUE} inset`,
  },
};

export default MyReviewRooms;
