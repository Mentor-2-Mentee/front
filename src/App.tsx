import { styled } from "@mui/system";
import { useState } from "react";
import { TopNavigation } from "./components/TopNavigation";
import { Route, Routes } from "react-router-dom";
import { IntroPage } from "./components/IntroPage";
import { MainPage } from "./components/MainPage";
import { MainPageContentsColor } from "./commonStyles/color";

export const App = (): JSX.Element => {
  return (
    <AppContainer className="App">
      <TopNavigation />

      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>

      <Footer></Footer>
    </AppContainer>
  );
};

const AppContainer = styled("div")(({ theme }) => ({
  minWidth: "1080px",
}));

const Footer = styled("div")(({ theme }) => ({
  height: "200px",
  backgroundColor: MainPageContentsColor.FOOTER_BACKGROUND,
}));

export default App;
