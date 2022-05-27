import { styled } from "@mui/system";
import { TopNavigation } from "./components/TopNavigation";
import { Route, Routes } from "react-router-dom";
import { IntroPage } from "./components/IntroPage";
import { MainPage } from "./components/MainPage";
import Footer from "./commonElements/Footer";
import { useParams } from "react-router";
import { useEffect } from "react";
import MentoringRoomsPage from "./components/MentoringRoomsPage";

export const App = (): JSX.Element => {
  return (
    <AppContainer className="App">
      <TopNavigation />

      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/qrooms" element={<MentoringRoomsPage />} />
      </Routes>

      {/* <Footer /> */}
    </AppContainer>
  );
};

const AppContainer = styled("div")(({ theme }) => ({
  minWidth: "1080px",
}));

export default App;
