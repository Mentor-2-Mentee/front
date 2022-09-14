import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";

export const PdfDownload = () => {
  const { examScheduleId, examField } = useParams();

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
        <a
          href={`${
            import.meta.env.VITE_APP_BASEURL
          }/exam-mentoring-room/question-pdf?examScheduleId=${examScheduleId}&examField=${examField}`}
        >
          문제 다운로드
        </a>
      </div>
      <a
        href={`${
          import.meta.env.VITE_APP_BASEURL
        }/exam-mentoring-room/solution-pdf?examScheduleId=${examScheduleId}&examField=${examField}`}
      >
        솔루션 다운로드
      </a>
    </Box>
  );
};

export default PdfDownload;
