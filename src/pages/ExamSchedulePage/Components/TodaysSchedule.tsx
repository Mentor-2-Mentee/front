import { styled } from "@mui/system";
import axiosInstance from "../../../api/axiosInstance";

const examPdfAPi = async () => {
  try {
    const res = await axiosInstance().get("/examSchedule/exam");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

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
