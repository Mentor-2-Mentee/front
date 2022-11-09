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

export const MainPage = (): JSX.Element => {
  return (
    <MainPageContainer>
      <SearchBar />
      <ScheduleSummary />
      {/* <LiveRoomList /> */}
      <MainPageUserData />
      {/* <WaitRoomList /> */}
      <NewQuestionButton />
    </MainPageContainer>
  );
};

const MainPageContainer = styled("div")({
  backgroundColor: MainPageContentsColor.MAIN_PAGE_BACKGROUND,
});

export default MainPage;
