import {
  Button,
  CircularProgress,
  Typography,
  SxProps,
  Box,
  Modal,
  Theme,
} from "@mui/material";
import { styled } from "@mui/system";
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
  useDeleteExamReviewRoomRequestMutation,
  useGetExamReviewRoomRequestListQuery,
  usePostExamReviewRoomRequestMutation,
} from "../../../../../hooks/queries/examReviewRoom";

interface CreateExamReviewRoomRequestListProps {
  examScheduleTitle: string;
}
export const CreateExamReviewRoomRequestList = ({
  examScheduleTitle,
}: CreateExamReviewRoomRequestListProps) => {
  const { id, userGrade } = useContext(RootContext);
  const canCreate = userGradeCheck(["master,admin"], userGrade);

  console.log(canCreate);
  const { enqueueSnackbar } = useSnackbar();
  const { hash } = useLocation();
  const hashedExamScheduleId = Number(hash.substr(1));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedExamType, setSelectedExamType] = useState<string>("");

  const examReviewRoomRequestListQuery = useGetExamReviewRoomRequestListQuery({
    examScheduleId: hashedExamScheduleId,
    userId: id,
  });

  const postExamReviewRoomForm =
    usePostExamReviewRoomFormMutation(hashedExamScheduleId);

  const postExamReviewRoomRequestForm = usePostExamReviewRoomRequestMutation(
    hashedExamScheduleId,
    enqueueSnackbar
  );

  const deleteExamReviewRoomRequest =
    useDeleteExamReviewRoomRequestMutation(hashedExamScheduleId);

  const handleCreateReviewRoomButton = (examType: string) => () => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    postExamReviewRoomForm.mutate({
      token,
      examType,
      examScheduleId: hashedExamScheduleId,
    });
  };

  const handleCancelRequestButton =
    (requestId: number, examType: string) => () => {
      const token = getCookieValue("accessToken");
      if (!token) {
        enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
        return;
      }
      deleteExamReviewRoomRequest.mutate({
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
              <Box sx={RoomHeadBoxSxProps({ userExist })} />
              <Typography variant="body2" sx={{ ml: 2 }}>
                {examType}
              </Typography>
              <Typography
                variant="body2"
                sx={RequestTypographySxProps}
              >{`${totalUserCount}명 참여대기중`}</Typography>
              {canCreate ? (
                <Button
                  size="small"
                  variant="text"
                  sx={ButtonSxProps}
                  onClick={handleCreateReviewRoomButton(examType)}
                >
                  생성하기
                </Button>
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

const roomHeadColor = ({
  userExist,
}: Pick<CreateExamReviewRoomRequest, "userExist">) => {
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

const RoomHeadBoxSxProps = (
  userExist: Pick<CreateExamReviewRoomRequest, "userExist">
): SxProps => ({
  width: 10,
  height: "100%",
  backgroundColor: roomHeadColor(userExist),
  position: "absolute",
});

const ExamReviewRoomListSxProps: SxProps = {
  background: SignatureColor.WHITE,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  position: "relative",
  height: 32,
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
