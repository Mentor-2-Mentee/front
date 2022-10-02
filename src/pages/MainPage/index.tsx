import { styled } from "@mui/system";

import { MainPageContentsColor } from "../../commonStyles/CommonColor";
import NewQuestionButton from "../../commonElements/NewQuestionButton";
import {
  LiveRoomList,
  MainPageUserData,
  SearchBar,
  WaitRoomList,
} from "./Components";
import { ScheduleSummary } from "./Components/ScheduleSummary";
import { QueryClientProvider } from "@tanstack/react-query";
import { examScheduleQueryClient } from "../../hooks/queries/examSchedule";
import { mentoringRoomQueryClient } from "../../hooks/queries/mentoringRoom";

export const MainPage = (): JSX.Element => {
  return (
    <MainPageContainer>
      <SearchBar />
      <QueryClientProvider client={examScheduleQueryClient}>
        <ScheduleSummary />
      </QueryClientProvider>
      <QueryClientProvider client={mentoringRoomQueryClient}>
        <LiveRoomList />
      </QueryClientProvider>
      <MainPageUserData />
      <WaitRoomList />
      <NewQuestionButton />
    </MainPageContainer>
  );
};

const MainPageContainer = styled("div")({
  backgroundColor: MainPageContentsColor.MAIN_PAGE_BACKGROUND,
});

export default MainPage;
