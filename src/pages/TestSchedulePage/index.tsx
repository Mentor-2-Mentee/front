import { styled } from "@mui/system";
import { QueryClientProvider } from "react-query";
import { CommonSpace } from "../../commonStyles/CommonSpace";
import { testScheduleQueryClient } from "../../hooks/queries/testSchedule";
import MonthlySchedule from "./MonthlySchedule";
import TodaysSchedule from "./TodaysSchedule";

export const TestSchedulePage = (): JSX.Element => {
  return (
    <TestSchedulePageContainer>
      <QueryClientProvider client={testScheduleQueryClient}>
        <TodaysSchedule />
        <MonthlySchedule />
      </QueryClientProvider>
    </TestSchedulePageContainer>
  );
};

const TestSchedulePageContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(
    4,
    CommonSpace.MARGIN,
    CommonSpace.MARGIN,
    CommonSpace.MARGIN
  ),
  display: "grid",
  gridTemplateColumns: `${theme.spacing(20)} auto`,
}));

export default TestSchedulePage;
