import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { ExamSchedule } from "../../../../../hooks/queries/examSchedule";
import { urlChecker } from "../../../../../utils/urlChecker";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";

interface ExamScheduleInfoProps {
  examSchedule: ExamSchedule;
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

export const ExamScheduleInfo = ({
  examSchedule,
}: ExamScheduleInfoProps): JSX.Element => {
  const dateLeft = DateLeftCalculator(new Date(examSchedule.examDate));

  return (
    <ExamScheduleInfoContainer>
      <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
        {examSchedule.organizer}
      </Typography>
      <Typography variant="inherit" sx={{ mb: 2 }}>
        {` 응시일 : ${examSchedule.examDate} (D${dateLeft})`}
      </Typography>
      <Typography variant="inherit" sx={{ mb: 2 }}>
        {` 응시내용 : ${examSchedule.description}`}
      </Typography>
      {urlChecker(examSchedule.examUrl) ? (
        <Button variant="outlined" size="small" href={examSchedule.examUrl}>
          공지링크
        </Button>
      ) : null}
    </ExamScheduleInfoContainer>
  );
};

const ExamScheduleInfoContainer = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,

  padding: theme.spacing(2),
}));

export default ExamScheduleInfo;
