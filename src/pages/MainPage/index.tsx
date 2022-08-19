import { styled } from "@mui/system";

import { MainPageContentsColor } from "../../commonStyles/CommonColor";
import CreateQuestionRoomButton from "../../commonElements/CreateQuestionRoomButton";
import {
  LiveRoomList,
  MainPageUserData,
  SearchBar,
  WaitRoomList,
} from "./Components";

export const MainPage = (): JSX.Element => {
  return (
    <MainPageContainer>
      <SearchBar />
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
