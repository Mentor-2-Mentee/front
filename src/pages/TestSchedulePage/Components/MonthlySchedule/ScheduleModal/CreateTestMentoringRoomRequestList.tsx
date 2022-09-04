import { Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext } from "react";
import { useLocation } from "react-router";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { RootContext } from "../../../../../hooks/context/RootContext";
import {
  CreateTestMentoringRoomRequest,
  useDeleteTestMentoringRoomRequestMutation,
  useGetTestMentoringRoomRequestListQuery,
  usePostTestMentoringRoomRequestMutation,
} from "../../../../../hooks/queries/testSchedule";
import { getCookieValue } from "../../../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";
import { usePostTestMentoringRoomFormMutation } from "../../../../../hooks/queries/testMentoringRoom/usePostTestMentoringRoomFormMutation";
import { userGradeCheck } from "../../../../../utils/userGradeCheck";

enum ButtonTextType {
  admin = "생성하기",
  requestedUser = "신청취소",
  unrequestedUser = "신청하기",
}

export const CreateTestMentoringRoomRequestList = () => {
  const { userId, userGrade } = useContext(RootContext);

  const { enqueueSnackbar } = useSnackbar();
  const { hash } = useLocation();
  const hashedTestScheduleId = Number(hash.substr(1));

  const testMentoringRoomRequestListQuery =
    useGetTestMentoringRoomRequestListQuery({
      testScheduleId: hashedTestScheduleId,
    });

  const postTestMentoringRoomForm =
    usePostTestMentoringRoomFormMutation(hashedTestScheduleId);

  const postTestMentoringRoomRequestForm =
    usePostTestMentoringRoomRequestMutation(hashedTestScheduleId);

  const deleteTestMentoringRoomRequest =
    useDeleteTestMentoringRoomRequestMutation(hashedTestScheduleId);

  if (testMentoringRoomRequestListQuery.status !== "success") {
    return <CircularProgress />;
  }

  const buttonType = (
    requestElement: CreateTestMentoringRoomRequest,
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
      testScheduleId,
      testField,
      requestUserList,
    }: CreateTestMentoringRoomRequest
  ) => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    switch (buttonType) {
      case "admin":
        postTestMentoringRoomForm.mutate({
          token: accessToken,
          testScheduleId,
          testField,
          userList: requestUserList,
        });
        enqueueSnackbar(`${testField} 질의응답방 생성 완료`, {
          variant: "success",
        });
        break;

      case "requestedUser":
        deleteTestMentoringRoomRequest.mutate({
          token: accessToken,
          testField,
          testScheduleId,
        });
        enqueueSnackbar(`${testField} 생성신청 취소`, {
          variant: "warning",
        });
        break;

      case "unrequestedUser":
        postTestMentoringRoomRequestForm.mutate({
          token: accessToken,
          testField,
          testScheduleId,
        });
        enqueueSnackbar(`${testField} 생성신청 완료`, {
          variant: "success",
        });
        break;

      default:
        postTestMentoringRoomRequestForm.mutate({
          token: accessToken,
          testField,
          testScheduleId,
        });
        enqueueSnackbar(`${testField} 생성신청 완료`, {
          variant: "success",
        });
        break;
    }
  };

  return (
    <>
      {testMentoringRoomRequestListQuery.data.map((requestElement) => {
        const elementButtonType = buttonType(requestElement, userId, userGrade);

        return (
          <TestMentoringRoom>
            <Typography variant="body2">{requestElement.testField}</Typography>
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
                handleRequestButton(elementButtonType, requestElement);
              }}
            >
              {ButtonTextType[elementButtonType]}
            </Button>
          </TestMentoringRoom>
        );
      })}
    </>
  );
};

const TestMentoringRoom = styled("div")(({ theme }) => ({
  background: SignatureColor.WHITE,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  position: "relative",
  height: theme.spacing(4),

  padding: theme.spacing(0, 2, 0, 2),
}));

export default CreateTestMentoringRoomRequestList;
