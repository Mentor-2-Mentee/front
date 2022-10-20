import {
  Box,
  Button,
  Modal,
  Skeleton,
  Theme,
  Typography,
  SxProps,
} from "@mui/material";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModalOpen = () => setIsOpen(true);
  const handleModalClose = () => setIsOpen(false);

  const examReviewRoomListQuery = useGetExamReviewRoomListQuery({
    examScheduleId: hashedExamScheduleId,
  });
  const postEnterMutation = usePostEnterMutation(handleModalOpen, navigation);

  if (examReviewRoomListQuery.status !== "success") {
    return <Skeleton variant="rectangular" width={"100%"} />;
  }

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
        console.log(examReviewRoom);
        const totalUserCount =
          examReviewRoom.adminUserId.length +
          examReviewRoom.participantUserId.length +
          examReviewRoom.nonParticipantUserId.length;
        return (
          <ExamReviewRoomElement>
            <Typography variant="body2">{examReviewRoom.examType}</Typography>
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                right: 80,
              }}
            >{`${totalUserCount}명 참여중`}</Typography>
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
          </ExamReviewRoomElement>
        );
      })}
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={ModalBoxSxProps}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            미응시자는 시험예정시간 (13:00 ~ 14:00)사이에 참석체크에
            응해야합니다.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              // onClick={handleRequestRoomButton(false)}
            >
              미응시자 입장
            </Button>
            <Button
              variant="contained"
              //  onClick={handleRequestRoomButton(true)}
            >
              응시자 입장
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const ModalBoxSxProps: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4, 4, 5, 4),
  marginBottom: theme.spacing(20),
  display: "flex",
  flexFlow: "column",

  width: theme.spacing(40),
});

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
