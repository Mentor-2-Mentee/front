import { Box, Button } from "@mui/material";

export const ExitRoom = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" color="warning">
        방에서 퇴장하기
      </Button>
    </Box>
  );
};

export default ExitRoom;
