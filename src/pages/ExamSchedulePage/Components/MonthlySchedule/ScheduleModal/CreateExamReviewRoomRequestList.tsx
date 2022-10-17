import { Button, CircularProgress, Typography, SxProps } from "@mui/material";
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
  const { enqueueSnackbar } = useSnackbar();
  const { hash } = useLocation();
  const hashedExamScheduleId = Number(hash.substr(1));

  const examReviewRoomRequestListQuery = useGetExamReviewRoomRequestListQuery({
    examScheduleId: hashedExamScheduleId,
  });

  const postExamReviewRoomForm =
    usePostExamReviewRoomFormMutation(hashedExamScheduleId);

  const postExamReviewRoomRequestForm =
    usePostExamReviewRoomRequestMutation(hashedExamScheduleId);

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

  const handleRequestRoomButton =
    (examType: string, isParticipant: boolean, isCancel: boolean) => () => {
      const accessToken = getCookieValue("accessToken");
      if (accessToken === undefined) {
        enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
        return;
      }
      if (isCancel) {
        deleteExamReviewRoomRequest.mutate({
          token: accessToken,
          examType,
          isParticipant,
          examScheduleId: hashedExamScheduleId,
        });
      }
      if (!isCancel) {
        postExamReviewRoomRequestForm.mutate({
          token: accessToken,
          examType,
          isParticipant,
          examScheduleId: hashedExamScheduleId,
        });
      }
    };

  if (examReviewRoomRequestListQuery.isLoading) {
    return <CircularProgress />;
  }

  if (examReviewRoomRequestListQuery.isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {examReviewRoomRequestListQuery.data.map((createRoomRequest) => {
        const requestUserCount =
          createRoomRequest.participantUserCount +
          createRoomRequest.nonParticipantUserCount;
        return (
          <ExamReviewRoom>
            <Typography variant="body2">
              {createRoomRequest.examType}
            </Typography>
            <Typography
              variant="body2"
              sx={RequestTypographySxProps}
            >{`${requestUserCount}명 참여대기중`}</Typography>
            {canCreate ? (
              <Button size="small" variant="text" sx={ButtonSxProps}>
                생성하기
              </Button>
            ) : (
              <Button size="small" variant="text" sx={ButtonSxProps}>
                {createRoomRequest.isSubmitted ? "신청취소" : "신청하기"}
              </Button>
            )}
          </ExamReviewRoom>
        );
      })}
    </>
  );
};

const ExamReviewRoom = styled("div")(({ theme }) => ({
  background: SignatureColor.WHITE,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  position: "relative",
  height: theme.spacing(4),

  padding: theme.spacing(0, 2, 0, 2),
}));

const RequestTypographySxProps: SxProps = {
  position: "absolute",
  right: 80,
};

const ButtonSxProps: SxProps = {
  position: "absolute",
  right: 0,
};

export default CreateExamReviewRoomRequestList;
