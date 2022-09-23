import { Box, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { ExamScheduleContext } from "..";

export const DailyScheduleSummary = () => {
  const { selectedDayScheduleList } = useContext(ExamScheduleContext);
  return (
    <Box sx={SelectedScheduleBoxSxProps}>
      {selectedDayScheduleList.length === 0 ? (
        <div>스케쥴이 없습니다.</div>
      ) : (
        <>
          {selectedDayScheduleList.map((ele) => {
            return <div>{ele.examScheduleTitle}</div>;
          })}
        </>
      )}
    </Box>
  );
};

const SelectedScheduleBoxSxProps: SxProps<Theme> = (theme: Theme) => ({
  m: 1,
});
