import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { useGetExamReviewRoomListQuery } from "../../../../../hooks/queries/examSchedule";
import { getCookieValue } from "../../../../../utils/handleCookieValue";

export const ExamReviewRoomList = (): JSX.Element => {
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { hash } = useLocation();
  const hashedExamScheduleId = Number(hash.substr(1));

  const examReviewRoomListQuery = useGetExamReviewRoomListQuery({
    examScheduleId: hashedExamScheduleId,
  });

  if (examReviewRoomListQuery.status !== "success") {
    return (
      <ExamReviewRoomElement>
        <Typography variant="body2">생성된 방이 없습니다.</Typography>
      </ExamReviewRoomElement>
    );
  }

  return (
    <>
      {examReviewRoomListQuery.data.map((ele) => {
        return (
          <ExamReviewRoomElement>
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
                const accessToken = getCookieValue("accessToken");
                if (accessToken === undefined) {
                  enqueueSnackbar("로그인 후 사용해 주세요.", {
                    variant: "warning",
                  });
                  return;
                }
                navigation(
                  `/exam-review-room/${ele.examScheduleId}/${ele.examField}`
                );
              }}
            >
              <Typography variant="body2">입장하기</Typography>
            </Button>
          </ExamReviewRoomElement>
        );
      })}
    </>
  );
};

const ExamReviewRoomElement = styled("div")(({ theme }) => ({
  background: SignatureColor.WHITE,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  position: "relative",
  height: theme.spacing(4),

  padding: theme.spacing(0, 2, 0, 2),
}));

export default ExamReviewRoomList;
