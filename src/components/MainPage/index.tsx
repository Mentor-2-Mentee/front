import { styled } from "@mui/system";
import InProgressRoomList from "./InProgressRoomList";
import SearchBar from "./SearchBar";

export const MainPage = (): JSX.Element => {
  return (
    <MainPageContainer>
      <SearchBar />
      <InProgressRoomList />
    </MainPageContainer>
  );
};

const MainPageContainer = styled("div")({});
