import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
import { useGetExamReviewRoomQuery } from "../../../../hooks/queries/examReviewRoom";
import { useUpdateRoomSettingMutation } from "../../../../hooks/queries/examReviewRoom/useUpdateRoomSettingMutation";
import { getCookieValue } from "../../../../utils";
import WarningIcon from "@mui/icons-material/Warning";

export const RestrictionRoom = () => {
  const params = useParams();
  const examReviewRoomId = Number(params.examReviewRoomId);
  const [enterCode, setEnterCode] = useState<string>("");
  const handleEnterCodeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEnterCode(event.target.value);
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: updateRoomSettingMutate } = useUpdateRoomSettingMutation(
    examReviewRoomId,
    enqueueSnackbar
  );
  const { data: examReviewRoomData, status: examReviewRoomQueryStatus } =
    useGetExamReviewRoomQuery({
      examReviewRoomId,
    });

  const setRestrictedMode = useCallback(
    (isRestricted: boolean) => {
      const token = getCookieValue("accessToken");
      if (!token) {
        enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
        return;
      }
      updateRoomSettingMutate({
        token,
        body: {
          examReviewRoomId,
          enterCode,
          isRestricted,
        },
      });
    },
    [updateRoomSettingMutate, enterCode]
  );

  const handleApplyButton = (isRestricted: boolean) => () => {
    setRestrictedMode(isRestricted);
  };

  if (examReviewRoomQueryStatus === "loading") return <CircularProgress />;
  if (examReviewRoomQueryStatus === "error") return <div>Error</div>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {`입장 제한 (관리자)`}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        코드를 입력해야 입장할수있는 제한적인 입장모드로 전환합니다.
      </Typography>

      <Box sx={{ display: "flex" }}>
        <TextField
          label={
            examReviewRoomData.enterCode === null
              ? "입장코드"
              : examReviewRoomData.enterCode
          }
          placeholder={"8자 이하"}
          size="small"
          error={enterCode.length > 8}
          helperText={enterCode.length > 8 ? "8자 이하로 작성" : null}
          sx={{ mr: 2, width: 250 }}
          value={enterCode}
          disabled={
            examReviewRoomData.isRestricted || examReviewRoomData.isArchived
          }
          onChange={handleEnterCodeChange}
        />
        {examReviewRoomData.isArchived ? (
          <Button variant="contained" disabled>
            <WarningIcon sx={{ mr: 1 }} />
            보관모드 해제필요
          </Button>
        ) : examReviewRoomData.isRestricted ? (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleApplyButton(false)}
          >
            제한모드 해제
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            disabled={enterCode.trim().length === 0 || enterCode.length > 8}
            onClick={handleApplyButton(true)}
          >
            제한모드 적용
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default RestrictionRoom;
