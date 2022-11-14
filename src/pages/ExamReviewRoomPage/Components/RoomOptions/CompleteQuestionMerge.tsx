import { Box, Typography } from "@mui/material";

export const CompleteQuestionMerge = () => {
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
    </Box>
  );
};

export default CompleteQuestionMerge;
