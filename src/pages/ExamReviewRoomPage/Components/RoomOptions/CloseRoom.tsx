import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { useGetExamReviewRoomQuery } from "../../../../hooks/queries/examReviewRoom";
import { useDeleteExamReviewRoomMutation } from "../../../../hooks/queries/examReviewRoom/useDeleteExamReviewRoomMutation";
import { getCookieValue } from "../../../../utils";

const CloseRoom = () => {
  const [confirmText, setConfirmText] = useState<string>("");
  const examReviewRoomId = Number(useParams().examReviewRoomId);
  const { enqueueSnackbar } = useSnackbar();
  const { data: roomData, status: roomDataQueryStatus } =
    useGetExamReviewRoomQuery({
      examReviewRoomId,
    });
  const navigation = useNavigate();

  const { mutate: deleteExamReviewRoomMutate } =
    useDeleteExamReviewRoomMutation(enqueueSnackbar, navigation);

  const handleDeleteRoomButton = useCallback(() => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    deleteExamReviewRoomMutate({
      token,
      examReviewRoomId,
    });
  }, [examReviewRoomId]);

  const handleConfirmTextInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmText(event.target.value);

  if (roomDataQueryStatus === "loading") {
    return <CircularProgress />;
  }
  if (roomDataQueryStatus === "error") {
    return <div>Error</div>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">시험리뷰방 폐쇄 (관리자)</Typography>
      <Typography variant="subtitle1">현재의 방을 폐쇄하려면</Typography>
      <Typography variant="subtitle1" fontWeight={"bold"}>
        {`"${roomData.examOrganizer}-${roomData.examType}"`}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        을 동일하게 입력해주세요
      </Typography>

      <Box sx={{ display: "flex" }}>
        <TextField
          placeholder={`${roomData.examOrganizer}-${roomData.examType}`}
          size="small"
          sx={{ mr: 2, width: 250 }}
          value={confirmText}
          onChange={handleConfirmTextInput}
        />
        <Button
          size="small"
          variant="contained"
          color="error"
          disabled={
            `${roomData.examOrganizer}-${roomData.examType}` !== confirmText
          }
          onClick={handleDeleteRoomButton}
        >
          폐쇄하기
        </Button>
      </Box>
      <Typography
        sx={{ fontWeight: "bold", color: SignatureColor.RED }}
        variant="subtitle2"
      >
        폐쇄 후 해당 방의 모든 데이터는 삭제되며, 복구할 수 없습니다.
      </Typography>
    </Box>
  );
};

export default CloseRoom;
