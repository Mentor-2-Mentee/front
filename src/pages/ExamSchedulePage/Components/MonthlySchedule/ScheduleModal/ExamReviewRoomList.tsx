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
import { useCallback, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { RootContext } from "../../../../../hooks/context/RootContext";
import { useGetExamReviewRoomListQuery } from "../../../../../hooks/queries/examReviewRoom";
import { usePostNewUserMutation } from "../../../../../hooks/queries/examReviewRoomUser/usePostNewUserMutation";
import { getCookieValue } from "../../../../../utils/handleCookieValue";

export const ExamReviewRoomList = (): JSX.Element => {
  const { id } = useContext(RootContext);
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { hash } = useLocation();
  const hashedExamScheduleId = Number(hash.substr(1));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModalOpen = () => setIsOpen(true);
  const handleModalClose = () => setIsOpen(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number>();

  const examReviewRoomListQuery = useGetExamReviewRoomListQuery({
    examScheduleId: hashedExamScheduleId,
    userId: id,
  });
  const { mutate: postNewUserMutate } = usePostNewUserMutation(
    enqueueSnackbar,
    navigation,
    setIsOpen
  );

  const handleRoonEnterButtonClick =
    (examReviewRoomId: number, userPosition?: string) => () => {
      //여기서 admin, master는 바로입장
      console.log(examReviewRoomId, "로 입장");

      setSelectedRoomId(examReviewRoomId);
      if (!userPosition) {
        handleModalOpen();
        return;
      }

      navigation(`/exam-review-room/${examReviewRoomId}`);
    };

  const handleNewEnterButtonClick = useCallback(
    (isParticipant: boolean) => () => {
      if (!selectedRoomId) return;

      const token = getCookieValue("accessToken");
      if (!token) {
        enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
        return;
      }

      postNewUserMutate({
        token,
        body: {
          isParticipant,
          examReviewRoomId: selectedRoomId,
        },
      });
    },
    [postNewUserMutate, selectedRoomId]
  );

  if (examReviewRoomListQuery.status !== "success") {
    return <Skeleton variant="rectangular" width={"100%"} />;
  }

  return (
    <>
      {examReviewRoomListQuery.data.map(
        ({ id, examType, userPosition, totalUserCount }) => {
          return (
            <ExamReviewRoomElement key={id}>
              <Box sx={RoomHeadBoxSxProps(userPosition)} />
              <Typography variant="body2">{examType}</Typography>
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
                onClick={handleRoonEnterButtonClick(id, userPosition)}
              >
                입장하기
              </Button>
            </ExamReviewRoomElement>
          );
        }
      )}
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
              onClick={handleNewEnterButtonClick(false)}
            >
              미응시자 입장
            </Button>
            <Button
              variant="contained"
              onClick={handleNewEnterButtonClick(true)}
            >
              응시자 입장
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const roomHeadColor = (userPosition?: string) => {
  switch (userPosition) {
    case "adminUser":
      return SignatureColor.RED;
    case "participant":
      return SignatureColor.BLUE;
    case "nonParticipant":
      return SignatureColor.PURPLE;
    default:
      return "unset";
  }
};

const RoomHeadBoxSxProps = (userPosition?: string): SxProps => ({
  width: 6,
  height: "80%",
  backgroundColor: roomHeadColor(userPosition),
  position: "absolute",
  borderRadius: 1,
  left: -10,
});

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
