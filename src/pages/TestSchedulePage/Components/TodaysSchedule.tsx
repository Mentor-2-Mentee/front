import { styled } from "@mui/system";
import axiosInstance from "../../../api/axiosInstance";

const testPdfAPi = async () => {
  try {
    const res = await axiosInstance().get("/testSchedule/test");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const TodaysSchedule = (): JSX.Element => {
  return (
    <TodaysScheduleContainer>
      <div>오늘의 스케쥴</div>
      <a href={`${import.meta.env.VITE_APP_BASEURL}/testSchedule/test`}>
        pdf생성 테스트
      </a>
    </TodaysScheduleContainer>
  );
};

const TodaysScheduleContainer = styled("div")(({ theme }) => ({
  background: "skyblue",
}));

export default TodaysSchedule;
