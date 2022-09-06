import { Typography } from "@mui/material";
export const CreateExamScheduleHeader = (): JSX.Element => {
  return (
    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
      시험일정 등록
    </Typography>
  );
};

export default CreateExamScheduleHeader;
