import { styled } from "@mui/system";
import LiveRoomList from "./LiveRoomList";
import SearchBar from "./SearchBar";
import WaitRoomList from "./WaitRoomList";

export const MainPage = (): JSX.Element => {
  return (
    <MainPageContainer>
      <SearchBar />
      <LiveRoomList />
      <WaitRoomList />
    </MainPageContainer>
  );
};

const MainPageContainer = styled("div")({});
