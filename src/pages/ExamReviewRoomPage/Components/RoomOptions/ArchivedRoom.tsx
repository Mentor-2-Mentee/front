import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useGetExamReviewRoomQuery } from "../../../../hooks/queries/examReviewRoom";
import WarningIcon from "@mui/icons-material/Warning";
import { useUpdateRoomSettingMutation } from "../../../../hooks/queries/examReviewRoom/useUpdateRoomSettingMutation";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { getCookieValue } from "../../../../utils";

export const ArchivedRoom = () => {
  const params = useParams();
  const examReviewRoomId = Number(params["examReviewRoomId"]);
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: updateRoomSettingMutate } = useUpdateRoomSettingMutation(
    examReviewRoomId,
    enqueueSnackbar
  );
  const { data: examReviewRoomData, status: examReviewRoomQueryStatus } =
    useGetExamReviewRoomQuery({
      examReviewRoomId,
    });

  const setArchivedMode = useCallback(
    (isArchived: boolean) => {
      const token = getCookieValue("accessToken");
      if (!token) {
        enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
        return;
      }
      updateRoomSettingMutate({
        token,
        body: {
          examReviewRoomId,
          isArchived,
        },
      });
    },
    [updateRoomSettingMutate]
  );

  const handleApplyButton = (isArchived: boolean) => () => {
    setArchivedMode(isArchived);
  };

  if (examReviewRoomQueryStatus === "loading") return <CircularProgress />;
  if (examReviewRoomQueryStatus === "error") return <div>Error</div>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {`문제 추합 완료 / 보관 (관리자)`}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2, whiteSpace: "pre" }}>
        {
          "문제 추합을 종료하고 보관모드로 전환합니다.\n문제 제출, 추합, 신규입장을 비활성화합니다."
        }
      </Typography>
      {examReviewRoomData.isRestricted ? (
        <Button variant="contained" disabled>
          <WarningIcon sx={{ mr: 1 }} />
          제한모드 해제필요
        </Button>
      ) : examReviewRoomData.isArchived ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleApplyButton(false)}
        >
          보관모드 해제하기
        </Button>
      ) : (
        <Button variant="contained" onClick={handleApplyButton(true)}>
          보관모드 적용하기
        </Button>
      )}
    </Box>
  );
};

export default ArchivedRoom;
