import { Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { useGetExamMentoringRoomListQuery } from "../../../../../hooks/queries/examSchedule";

export const ExamMentoringRoomList = (): JSX.Element => {
  const navigation = useNavigate();
  const { hash } = useLocation();
  const hashedExamScheduleId = Number(hash.substr(1));

  const examMentoringRoomListQuery = useGetExamMentoringRoomListQuery({
    examScheduleId: hashedExamScheduleId,
  });

  if (examMentoringRoomListQuery.status !== "success") {
    return (
      <ExamMentoringRoomElement>
        <Typography variant="body2">생성된 방이 없습니다.</Typography>
      </ExamMentoringRoomElement>
    );
  }

  return (
    <>
      {examMentoringRoomListQuery.data.map((ele) => {
        return (
          <ExamMentoringRoomElement>
            <Typography variant="body2">{ele.examField}</Typography>
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
                navigation(
                  `/exam-mentoring-room/${ele.examScheduleId}/${ele.examField}`
                );
              }}
            >
              <Typography variant="body2">입장하기</Typography>
            </Button>
          </ExamMentoringRoomElement>
        );
      })}
    </>
  );
};

const ExamMentoringRoomElement = styled("div")(({ theme }) => ({
  background: SignatureColor.WHITE,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  position: "relative",
  height: theme.spacing(4),

  padding: theme.spacing(0, 2, 0, 2),
}));

export default ExamMentoringRoomList;
