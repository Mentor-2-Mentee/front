import { Box, Typography } from "@mui/material";

interface PdfDownloadProps {
  examReviewRoomId: number;
}

export const PdfDownload = ({ examReviewRoomId }: PdfDownloadProps) => {
  return (
    <Box
      sx={(theme) => ({
        p: 2,
        overflow: "scroll",
        height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(19)} )`,
      })}
    >
      <Typography variant="h5">PDF 다운로드</Typography>
      <div>
        <a href={`/pdf/${examReviewRoomId}`} target="_blank">
          문제 다운로드
        </a>
      </div>
      <a href={`/pdf/${examReviewRoomId}?solution=true`} target="_blank">
        솔루션 다운로드
      </a>
    </Box>
  );
};

export default PdfDownload;
