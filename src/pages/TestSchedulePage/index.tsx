import { styled } from "@mui/system";
import { CommonSpace } from "../../commonStyles/CommonSpace";
import MonthlySchedule from "./Components/MonthlySchedule";
import TodaysSchedule from "./Components/TodaysSchedule";

export const TestSchedulePage = (): JSX.Element => {
  return (
    <TestSchedulePageContainer>
      <MonthlySchedule />
      <TodaysSchedule />
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
  // gridTemplateColumns: `${theme.spacing(20)} auto`,
}));

export default TestSchedulePage;
