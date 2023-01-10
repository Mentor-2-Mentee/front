import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { RootContext } from "../../../../hooks/context/RootContext";
import { useDeleteCurrentUserMutation } from "../../../../hooks/queries/examReviewRoomUser/useDeleteCurrentUserMutation";
import { getCookieValue } from "../../../../utils";

export const ExitRoom = () => {
  const { id } = useContext(RootContext);
  const params = useParams();
  const examReviewRoomId = Number(params["examReviewRoomId"]);
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();

  const { mutate: deleteCurrentUserMutate } = useDeleteCurrentUserMutation(
    examReviewRoomId,
    enqueueSnackbar,
    navigation
  );

  const exitRoom = useCallback(() => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    deleteCurrentUserMutate({
      token,
      examReviewRoomId,
      targetUserId: String(id),
    });
  }, [id, examReviewRoomId, deleteCurrentUserMutate]);

  const handleExitButton = () => {
    const isExit = confirm(
      `퇴장하시겠습니까? 입장제한시간일경우 재입장이 불가합니다`
    );
    if (!isExit) return;
    exitRoom();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" color="warning" onClick={handleExitButton}>
        방에서 퇴장하기
      </Button>
    </Box>
  );
};

export default ExitRoom;
