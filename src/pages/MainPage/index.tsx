import { styled } from "@mui/system";

import SearchBar from "./SearchBar";
import LiveRoomList from "./LiveRoomList";
import MainPageUserData from "./MainPageUserData";
import WaitRoomList from "./WaitRoomList";
import { MainPageContentsColor } from "../../commonStyles/CommonColor";
import CreateQuestionRoomButton from "../../commonElements/CreateQuestionRoomButton";

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
