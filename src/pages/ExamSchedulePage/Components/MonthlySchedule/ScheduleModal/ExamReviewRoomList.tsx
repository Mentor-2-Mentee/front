import { Box, Button, Modal, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { useGetExamReviewRoomListQuery } from "../../../../../hooks/queries/examReviewRoom";
import { usePostEnterMutation } from "../../../../../hooks/queries/examReviewRoom/usePostEnterMutation";
import { getCookieValue } from "../../../../../utils/handleCookieValue";

export const ExamReviewRoomList = (): JSX.Element => {
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { hash } = useLocation();
  const hashedExamScheduleId = Number(hash.substr(1));
  const [selectedExamField, setSelectedExamField] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

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

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const postEnterMutation = usePostEnterMutation(handleModalOpen, navigation);
  const handleRoonEnterButtonClick = (examReviewRoomId: number) => () => {
    postEnterMutation.mutate({
      token: getCookieValue("accessToken"),
      enterUserType: undefined,
      examReviewRoomId,
    });
  };

  return (
    <>
      {examReviewRoomListQuery.data.map((examReviewRoom) => {
        // const totalUserCount =
        //   examReviewRoom.adminUserId.length +
        //   examReviewRoom.participantUserId.length +
        //   examReviewRoom.nonParticipantUserId.length;
        return (
          <ExamReviewRoomElement>
            <Typography variant="body2">{examReviewRoom.examType}</Typography>
            {/* <Typography
              variant="body2"
              sx={{
                position: "absolute",
                right: 80,
              }}
            >{`${totalUserCount}명 참여중`}</Typography> */}
            <Button
              size="small"
              variant="text"
              sx={{
                position: "absolute",
                right: 0,
              }}
              onClick={handleRoonEnterButtonClick(examReviewRoom.id)}
            >
              입장하기
            </Button>
            <Modal open={open} onClose={handleModalClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: SignatureColor.GRAY,
                  borderRadius: 3,
                  width: 300,
                  height: 300,
                  boxShadow: 24,
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "center",

                  "& > *": {
                    mb: 1,
                  },
                }}
              >
                <Typography>{`미응시자는 시험예정시간 (13:00 ~ 14:00)사이에 참석체크에 응해야합니다.`}</Typography>
                <Button variant="contained">시험 응시자 입장</Button>
                <Button variant="contained">시험 미응시자 입장</Button>
              </Box>
            </Modal>
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
