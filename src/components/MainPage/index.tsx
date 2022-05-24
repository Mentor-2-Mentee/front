import { styled } from "@mui/system";
import LiveRoomList from "./LiveRoomList";
import SearchBar from "./SearchBar";

export const MainPage = (): JSX.Element => {
  return (
    <MainPageContainer>
      <SearchBar />
      <LiveRoomList />
    </MainPageContainer>
  );
};

const MainPageContainer = styled("div")({});
