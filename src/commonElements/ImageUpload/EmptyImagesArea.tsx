import { Box, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const EmptyImagesArea = (): JSX.Element => {
  return (
    <Box
      sx={{ p: 2, display: "flex", flexFlow: "column", alignItems: "center" }}
    >
      <AddPhotoAlternateIcon sx={{ fontSize: 50 }} />
      <Typography variant="subtitle1">
        {"이미지를 드래그&드롭으로 이곳에 올려주세요."}
      </Typography>
      <Typography variant="subtitle1">
        {"첫번째 이미지가 대표 이미지로 노출됩니다."}
      </Typography>
    </Box>
  );
};

export default EmptyImagesArea;
