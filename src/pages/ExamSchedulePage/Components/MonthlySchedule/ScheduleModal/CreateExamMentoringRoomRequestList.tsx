import { Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext } from "react";
import { useLocation } from "react-router";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { RootContext } from "../../../../../hooks/context/RootContext";
import {
  CreateExamMentoringRoomRequest,
  ExamSchedule,
  useDeleteExamMentoringRoomRequestMutation,
  useGetExamMentoringRoomRequestListQuery,
  usePostExamMentoringRoomRequestMutation,
} from "../../../../../hooks/queries/examSchedule";
import { getCookieValue } from "../../../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";
import { usePostExamMentoringRoomFormMutation } from "../../../../../hooks/queries/examMentoringRoom/usePostExamMentoringRoomFormMutation";
import { userGradeCheck } from "../../../../../utils/userGradeCheck";

enum ButtonTextType {
  admin = "생성하기",
  requestedUser = "신청취소",
  unrequestedUser = "신청하기",
}

interface CreateExamMentoringRoomRequestListProps {
  examScheduleTitle: string;
}
export const CreateExamMentoringRoomRequestList = ({
  examScheduleTitle,
}: CreateExamMentoringRoomRequestListProps) => {
  const { userId, userGrade } = useContext(RootContext);

  const { enqueueSnackbar } = useSnackbar();
  const { hash } = useLocation();
  const hashedExamScheduleId = Number(hash.substr(1));

  const examMentoringRoomRequestListQuery =
    useGetExamMentoringRoomRequestListQuery({
      examScheduleId: hashedExamScheduleId,
    });

  const postExamMentoringRoomForm =
    usePostExamMentoringRoomFormMutation(hashedExamScheduleId);

  const postExamMentoringRoomRequestForm =
    usePostExamMentoringRoomRequestMutation(hashedExamScheduleId);

  const deleteExamMentoringRoomRequest =
    useDeleteExamMentoringRoomRequestMutation(hashedExamScheduleId);

  if (examMentoringRoomRequestListQuery.status !== "success") {
    return <CircularProgress />;
  }

  const buttonType = (
    requestElement: CreateExamMentoringRoomRequest,
    userId?: string,
    userGrade?: string
  ): keyof typeof ButtonTextType => {
    if (userGradeCheck(["master", "admin"], userGrade)) return "admin";
    const isRequested = Boolean(
      requestElement.requestUserList.findIndex(
        (requestedUser) => requestedUser.userId === userId
      ) !== -1
    );
    if (isRequested) return "requestedUser";
    return "unrequestedUser";
  };

  const handleRequestButton = (
    buttonType: keyof typeof ButtonTextType,
    {
      examScheduleTitle,
      examScheduleId,
      examField,
      requestUserList,
    }: CreateExamMentoringRoomRequest
  ) => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    switch (buttonType) {
      case "admin":
        postExamMentoringRoomForm.mutate({
          token: accessToken,
          examScheduleTitle,
          examScheduleId,
          examField,
          userList: requestUserList,
        });
        enqueueSnackbar(`${examField} 질의응답방 생성 완료`, {
          variant: "success",
        });
        break;

      case "requestedUser":
        deleteExamMentoringRoomRequest.mutate({
          token: accessToken,
          examField,
          examScheduleId,
        });
        enqueueSnackbar(`${examField} 생성신청 취소`, {
          variant: "warning",
        });
        break;

      case "unrequestedUser":
        postExamMentoringRoomRequestForm.mutate({
          token: accessToken,
          examField,
          examScheduleId,
        });
        enqueueSnackbar(`${examField} 생성신청 완료`, {
          variant: "success",
        });
        break;

      default:
        postExamMentoringRoomRequestForm.mutate({
          token: accessToken,
          examField,
          examScheduleId,
        });
        enqueueSnackbar(`${examField} 생성신청 완료`, {
          variant: "success",
        });
        break;
    }
  };

  return (
    <>
      {examMentoringRoomRequestListQuery.data.map((requestElement) => {
        const elementButtonType = buttonType(requestElement, userId, userGrade);
        return (
          <ExamMentoringRoom>
            <Typography variant="body2">{requestElement.examField}</Typography>
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                right: 80,
              }}
            >{`${requestElement.requestUserList.length}명 참여대기중`}</Typography>

            <Button
              size="small"
              variant="text"
              sx={{
                position: "absolute",
                right: 0,
              }}
              onClick={() => {
                handleRequestButton(elementButtonType, {
                  ...requestElement,
                  examScheduleTitle,
                });
              }}
            >
              {ButtonTextType[elementButtonType]}
            </Button>
          </ExamMentoringRoom>
        );
      })}
    </>
  );
};

const ExamMentoringRoom = styled("div")(({ theme }) => ({
  background: SignatureColor.WHITE,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  position: "relative",
  height: theme.spacing(4),

  padding: theme.spacing(0, 2, 0, 2),
}));

export default CreateExamMentoringRoomRequestList;
