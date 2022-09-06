import { Box, Button } from "@mui/material";

export const TopBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Button>문제수 설정</Button>
      <Button>PDF 다운로드</Button>
    </Box>
  );
};

export default TopBar;
