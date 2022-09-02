import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { TestSchedule } from "../../../../hooks/queries/testSchedule";
import { urlChecker } from "../../../../utils/urlChecker";
import { SignatureColor } from "../../../../commonStyles/CommonColor";

interface TestScheduleInfoProps {
  testSchedule: TestSchedule;
}

const DateLeftCalculator = (targetDate: Date): string => {
  const todayTime = new Date();
  const diff = targetDate.getTime() - todayTime.getTime();

  if (
    todayTime.getMonth() === targetDate.getMonth() &&
    todayTime.getDate() === targetDate.getDate()
  )
    return "-day";

  const isPassed = Boolean(diff < 0);
  const dateLeft = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24)) + 1;

  return isPassed ? `+${dateLeft}` : `-${dateLeft}`;
};

export const TestScheduleInfo = ({
  testSchedule,
}: TestScheduleInfoProps): JSX.Element => {
  const dateLeft = DateLeftCalculator(new Date(testSchedule.testDate));

  return (
    <TestScheduleInfoContainer>
      <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
        {testSchedule.testScheduleTitle}
      </Typography>
      <Typography variant="inherit" sx={{ mb: 2 }}>
        {` 응시일 : ${testSchedule.testDate} (D${dateLeft})`}
      </Typography>
      <Typography variant="inherit" sx={{ mb: 2 }}>
        {` 응시내용 : ${testSchedule.testDescription}`}
      </Typography>
      {urlChecker(testSchedule.testUrl) ? (
        <Button variant="outlined" size="small" href={testSchedule.testUrl}>
          공지링크
        </Button>
      ) : null}
    </TestScheduleInfoContainer>
  );
};

const TestScheduleInfoContainer = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,

  padding: theme.spacing(2),
}));

export default TestScheduleInfo;
