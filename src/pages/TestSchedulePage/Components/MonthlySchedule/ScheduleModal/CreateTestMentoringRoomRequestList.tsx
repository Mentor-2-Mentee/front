import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { RootContext } from "../../../../../hooks/context/RootContext";
import {
  CreateTestMentoringRoomRequest,
  TestScheduleCacheDataEntity,
} from "../../../../../hooks/queries/testSchedule";
import { createTestMentoringRoom } from "../../../../../hooks/queries/testMentoringRoom/createTestMentoringRoom";
import { getCookieValue } from "../../../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";

interface CreateTestMentoringRoomRequestListProps {
  createTestMentoringRoomRequestList: CreateTestMentoringRoomRequest[];
}

export const CreateTestMentoringRoomRequestList = ({
  createTestMentoringRoomRequestList,
}: CreateTestMentoringRoomRequestListProps): JSX.Element => {
  const { userId, userGrade } = useContext(RootContext);
  const { hash } = useLocation();

  return (
    <>
      {createTestMentoringRoomRequestList.map((requestElement) => {
        return (
          <TestMentoringRoom>
            <Typography variant="body2">
              {requestElement.requestTestField}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                right: 80,
              }}
            >{`${requestElement.requestUserList.length}명 참여대기중`}</Typography>
            <>{renderListElementButton(requestElement, userId, userGrade)}</>
          </TestMentoringRoom>
        );
      })}
    </>
  );
};

const renderListElementButton = (
  {
    requestUserList,
    requestTestField,
    testScheduleId,
  }: CreateTestMentoringRoomRequest,
  userId = "",
  userGrade = ""
) => {
  const { hash } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const submitTestMentoringRoomForm = async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    try {
      const response = await createTestMentoringRoom({
        token: accessToken,
        testScheduleId,
        requestTestField,
        userList: requestUserList,
      });
    } catch (error) {
      enqueueSnackbar(`${requestTestField}방 생성 실패.`, { variant: "error" });
    }
  };

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
          submitTestMentoringRoomForm();
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
