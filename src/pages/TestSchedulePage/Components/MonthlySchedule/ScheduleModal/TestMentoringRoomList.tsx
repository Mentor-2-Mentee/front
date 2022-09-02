import { Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { useGetTestMentoringRoomListQuery } from "../../../../../hooks/queries/testSchedule";

export const TestMentoringRoomList = (): JSX.Element => {
  const navigation = useNavigate();
  const { hash } = useLocation();
  const hashedTestScheduleId = Number(hash.substr(1));

  const testMentoringRoomListQuery = useGetTestMentoringRoomListQuery({
    testScheduleId: hashedTestScheduleId,
  });

  if (testMentoringRoomListQuery.status !== "success") {
    return <CircularProgress />;
  }

  return (
    <>
      {testMentoringRoomListQuery.data.map((ele) => {
        return (
          <TestMentoringRoomElement>
            <Typography variant="body2">{ele.testField}</Typography>
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                right: 80,
              }}
            >{`${ele.userList.length}명 참여중`}</Typography>
            <Button
              size="small"
              variant="text"
              sx={{
                position: "absolute",
                right: 0,
              }}
              onClick={() => {
                navigation(`/test-mentoring-room/${ele.testMentoringRoomId}`);
              }}
            >
              <Typography variant="body2">입장하기</Typography>
            </Button>
          </TestMentoringRoomElement>
        );
      })}
    </>
  );
};

const TestMentoringRoomElement = styled("div")(({ theme }) => ({
  background: SignatureColor.WHITE,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  position: "relative",
  height: theme.spacing(4),

  padding: theme.spacing(0, 2, 0, 2),
}));

export default TestMentoringRoomList;
