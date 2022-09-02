import { Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useState } from "react";
import { UseMutationResult, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { RootContext } from "../../../../../hooks/context/RootContext";
import {
  CreateTestMentoringRoomRequest,
  TestScheduleCacheDataEntity,
  useDeleteTestMentoringRoomRequestMutation,
  useGetTestMentoringRoomRequestListQuery,
  usePostTestMentoringRoomRequestMutation,
} from "../../../../../hooks/queries/testSchedule";
import { createTestMentoringRoom } from "../../../../../hooks/queries/testMentoringRoom/createTestMentoringRoom";
import { getCookieValue } from "../../../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";
import { usePostTestMentoringRoomFormMutation } from "../../../../../hooks/queries/testMentoringRoom/usePostTestMentoringRoomFormMutation";

// interface CreateTestMentoringRoomRequestListProps {
//   createTestMentoringRoomRequestList: CreateTestMentoringRoomRequest[];
// }

export const CreateTestMentoringRoomRequestList = () => {
  const { userId, userGrade } = useContext(RootContext);

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

  testMentoringRoomRequestListQuery.data;
  return (
    <>
      {testMentoringRoomRequestListQuery.data.map((requestElement) => {
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
            <>
              {renderListElementButton(
                requestElement,
                userId,
                userGrade,
                postTestMentoringRoomForm,
                postTestMentoringRoomRequestForm,
                deleteTestMentoringRoomRequest
              )}
            </>
          </TestMentoringRoom>
        );
      })}
    </>
  );
};

const renderListElementButton = (
  {
    requestUserList,
    testField,
    testScheduleId,
  }: CreateTestMentoringRoomRequest,
  userId = "",
  userGrade = "",
  postTestMentoringRoomForm: any,
  postTestMentoringRoomRequestForm: any,
  deleteTestMentoringRoomRequest: any
) => {
  const { hash } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  if (userGrade === "master")
    return (
      <Button
        size="small"
        variant="text"
        color="secondary"
        sx={{
          position: "absolute",
          right: 0,
        }}
        onClick={() => {
          const accessToken = getCookieValue("accessToken");
          if (accessToken === undefined) {
            enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
            return;
          }
          postTestMentoringRoomForm.mutate({
            token: accessToken,
            testScheduleId,
            testField,
            userList: requestUserList,
          });
        }}
      >
        생성하기
      </Button>
    );

  const isMe = Boolean(
    requestUserList.findIndex((targetUser) => targetUser.userId === userId) !==
      -1
  );

  if (isMe)
    return (
      <Button
        size="small"
        variant="text"
        color="warning"
        sx={{
          position: "absolute",
          right: 0,
        }}
        onClick={() => {
          const accessToken = getCookieValue("accessToken");
          if (accessToken === undefined) {
            enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
            return;
          }
          deleteTestMentoringRoomRequest.mutate({
            token: accessToken,
            testField,
            testScheduleId,
          });
          console.log("신청취소");
        }}
      >
        신청취소
      </Button>
    );

  return (
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
          enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
          return;
        }
        postTestMentoringRoomRequestForm.mutate({
          token: accessToken,
          testField,
          testScheduleId,
        });
        enqueueSnackbar(`${testField} 생성신청 완료`, {
          variant: "success",
        });
      }}
    >
      생성신청
    </Button>
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
