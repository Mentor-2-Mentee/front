import { styled } from "@mui/system";

export const TodaysSchedule = (): JSX.Element => {
  return (
    <TodaysScheduleContainer>
      <div>오늘의 스케쥴</div>
    </TodaysScheduleContainer>
  );
};

const TodaysScheduleContainer = styled("div")(({ theme }) => ({
  background: "skyblue",
}));

export default TodaysSchedule;
