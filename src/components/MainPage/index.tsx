import { styled } from "@mui/system";

import SearchBar from "./SearchBar";
import LiveRoomList from "./LiveRoomList";
import MainPageUserData from "./MainPageUserData";
import WaitRoomList from "./WaitRoomList";

export const MainPage = (): JSX.Element => {
  return (
    <MainPageContainer>
      <SearchBar />
      <LiveRoomList />
      <MainPageUserData />
      <WaitRoomList />
    </MainPageContainer>
  );
};

const MainPageContainer = styled("div")({});
