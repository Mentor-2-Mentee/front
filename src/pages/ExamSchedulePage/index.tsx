import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import MonthlySchedule from "./Components/MonthlySchedule";
import { DailyScheduleSummary } from "./Components/DailyScheduleSummary";

export const ExamSchedulePage = (): JSX.Element => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  return (
    <ExamSchedulePageContainer>
      <MonthlySchedule />
      {isWidthShort ? <DailyScheduleSummary /> : null}
    </ExamSchedulePageContainer>
  );
};

const ExamSchedulePageContainer = styled("div")(({ theme }) => ({
  display: "grid",
}));

export default ExamSchedulePage;
