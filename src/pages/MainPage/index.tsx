import { styled } from "@mui/system";

import { MainPageContentsColor } from "../../commonStyles/CommonColor";
import CreateQuestionRoomButton from "../../commonElements/CreateQuestionRoomButton";
import {
  LiveRoomList,
  MainPageUserData,
  SearchBar,
  WaitRoomList,
} from "./Components";
import { ScheduleSummary } from "./Components/ScheduleSummary";
import { QueryClientProvider } from "@tanstack/react-query";
import { examScheduleQueryClient } from "../../hooks/queries/examSchedule";

export const MainPage = (): JSX.Element => {
  return (
    <MainPageContainer>
      <SearchBar />
      <QueryClientProvider client={examScheduleQueryClient}>
        <ScheduleSummary />
      </QueryClientProvider>
      <LiveRoomList />
      <MainPageUserData />
      <WaitRoomList />
      <CreateQuestionRoomButton />
    </MainPageContainer>
  );
};

const MainPageContainer = styled("div")({
  backgroundColor: MainPageContentsColor.MAIN_PAGE_BACKGROUND,
});

export default MainPage;
