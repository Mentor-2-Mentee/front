import { styled } from "@mui/system";
import SearchBar from "./SearchBar";

export const MainPage = (): JSX.Element => {
  return (
    <MainPageContainer>
      <SearchBar />
      <div>여기는</div>
      <div>메인페이지</div>
    </MainPageContainer>
  );
};

const MainPageContainer = styled("div")({});
