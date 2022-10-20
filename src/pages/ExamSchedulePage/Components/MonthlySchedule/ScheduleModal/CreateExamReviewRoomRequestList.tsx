import {
  Button,
  CircularProgress,
  Typography,
  SxProps,
  Box,
  Modal,
  Theme,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { useLocation } from "react-router";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { RootContext } from "../../../../../hooks/context/RootContext";
import { getCookieValue } from "../../../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";
import { usePostExamReviewRoomFormMutation } from "../../../../../hooks/queries/examReviewRoom/usePostExamReviewRoomFormMutation";
import { userGradeCheck } from "../../../../../utils/userGradeCheck";
import {
  CreateExamReviewRoomRequest,
  useCancelRequestMutation,
  useGetExamReviewRoomRequestListQuery,
  usePostExamReviewRoomRequestMutation,
  UserExist,
} from "../../../../../hooks/queries/examReviewRoom";
import { useDeleteRequestMutation } from "../../../../../hooks/queries/examReviewRoom/useDeleteRequestMutation";

interface CreateExamReviewRoomRequestListProps {
  examScheduleTitle: string;
}
export const CreateExamReviewRoomRequestList = ({
  examScheduleTitle,
}: CreateExamReviewRoomRequestListProps) => {
  const { id, userGrade } = useContext(RootContext);
  const canCreate = userGradeCheck(["master", "admin"], userGrade);
  const { enqueueSnackbar } = useSnackbar();
  const { hash } = useLocation();
  const hashedExamScheduleId = Number(hash.substr(1));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [selectedExamType, setSelectedExamType] = useState<string>("");
  const [selectedRequestId, setSelectedRequestId] = useState<number>();

  const examReviewRoomRequestListQuery = useGetExamReviewRoomRequestListQuery({
    examScheduleId: hashedExamScheduleId,
    userId: id,
  });

  const createRoom = usePostExamReviewRoomFormMutation(
    hashedExamScheduleId,
    enqueueSnackbar,
    setIsAdminModalOpen
  );

  const postExamReviewRoomRequestForm = usePostExamReviewRoomRequestMutation(
    hashedExamScheduleId,
    enqueueSnackbar,
    setIsOpen
  );

  const cancelRequest = useCancelRequestMutation(
    hashedExamScheduleId,
    enqueueSnackbar
  );

  const deleteRequest = useDeleteRequestMutation(
    hashedExamScheduleId,
    enqueueSnackbar,
    setIsAdminModalOpen
  );

  const handleCreateReviewRoomButton = useCallback(() => {
    if (!selectedRequestId) return;
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    createRoom.mutate({
      token,
      requestId: selectedRequestId,
    });
  }, [createRoom, selectedRequestId]);

  const handleRequestDeleteButton = useCallback(() => {
    if (!selectedRequestId) return;
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    deleteRequest.mutate({
      token,
      requestId: selectedRequestId,
      examType: selectedExamType,
    });
  }, [deleteRequest, selectedExamType, selectedRequestId]);

  const handleCancelRequestButton =
    (requestId: number, examType: string) => () => {
      const token = getCookieValue("accessToken");
      if (!token) {
        enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
        return;
      }
      cancelRequest.mutate({
        token,
        requestId,
        examType,
      });
    };

  const handleModalOpen = (examType: string) => () => {
    setSelectedExamType(examType);
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleAdminModalOpen = (requestId: number, examType: string) => () => {
    setSelectedRequestId(requestId);
    setSelectedExamType(examType);
    setIsAdminModalOpen(true);
  };
  const handleAdminModalClose = () => setIsAdminModalOpen(false);

  const handleRequestRoomButton = (isParticipant: boolean) => () => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    postExamReviewRoomRequestForm.mutate({
      token,
      examScheduleId: hashedExamScheduleId,
      examType: selectedExamType,
      isParticipant,
    });
  };

  if (examReviewRoomRequestListQuery.isLoading) {
    return <CircularProgress />;
  }

  if (examReviewRoomRequestListQuery.isError) {
    return <div>Error</div>;
  }
  return (
    <Box
      sx={{
        borderTop: `3px solid ${SignatureColor.GRAY_BORDER}`,
      }}
    >
      {examReviewRoomRequestListQuery.data.map(
        ({ id, examType, userExist, totalUserCount }) => {
          return (
            <Box sx={ExamReviewRoomListSxProps}>
              <Box sx={RoomHeadBoxSxProps(userExist)} />
              <Typography variant="body2" sx={{ ml: 2 }}>
                {examType}
              </Typography>
              <Typography
                variant="body2"
                sx={RequestTypographySxProps}
              >{`${totalUserCount}명 참여대기중`}</Typography>
              {canCreate ? (
                <Box sx={ButtonSxProps}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={handleAdminModalOpen(id, examType)}
                  >
                    생성/삭제
                  </Button>
                </Box>
              ) : (
                <Button
                  size="small"
                  color={userExist ? "warning" : "primary"}
                  variant="text"
                  sx={ButtonSxProps}
                  onClick={
                    userExist
                      ? handleCancelRequestButton(id, examType)
                      : handleModalOpen(examType)
                  }
                >
                  {userExist ? "신청취소" : "신청하기"}
                </Button>
              )}
            </Box>
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
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRequestRoomButton(false)}
            >
              생성신청 (미응시자)
            </Button>
            <Button variant="contained" onClick={handleRequestRoomButton(true)}>
              생성신청 (응시자)
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={isAdminModalOpen} onClose={handleAdminModalClose}>
        <Box sx={ModalBoxSxProps}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {`${selectedExamType} 리뷰방을 생성합니다. 생성시 자동으로 해당 방의 관리자에
            등록됩니다.`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              color="error"
              variant="contained"
              onClick={handleRequestDeleteButton}
            >
              삭제
            </Button>
            <Button variant="contained" onClick={handleCreateReviewRoomButton}>
              생성
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
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

const roomHeadColor = (userExist: UserExist) => {
  switch (userExist) {
    case "participantUser":
      return SignatureColor.BLUE;
    case "nonParticipantUser":
      return SignatureColor.PURPLE;
    case false:
      return "unset";
    default:
      return "unset";
  }
};

const RoomHeadBoxSxProps = (userExist: UserExist): SxProps => ({
  width: 6,
  height: "80%",
  backgroundColor: roomHeadColor(userExist),
  position: "absolute",
  borderRadius: 1,
  left: -10,
});

const ExamReviewRoomListSxProps: SxProps = {
  backgroundColor: SignatureColor.WHITE,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  position: "relative",
  height: 32,

  "&:hover": {
    backgroundColor: SignatureColor.GRAY,
  },
};

const RequestTypographySxProps: SxProps = {
  position: "absolute",
  right: 80,
};

const ButtonSxProps: SxProps = {
  position: "absolute",
  right: 0,
};

export default CreateExamReviewRoomRequestList;
