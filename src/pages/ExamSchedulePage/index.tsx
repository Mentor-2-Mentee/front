import { styled } from "@mui/system";
import MonthlySchedule from "./Components/MonthlySchedule";

export const ExamSchedulePage = (): JSX.Element => {
  return (
    <ExamSchedulePageContainer>
      <MonthlySchedule />
    </ExamSchedulePageContainer>
  );
};

const ExamSchedulePageContainer = styled("div")(({ theme }) => ({
  display: "grid",
}));

export default ExamSchedulePage;
