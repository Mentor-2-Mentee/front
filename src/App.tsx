import { styled } from "@mui/system";
import { TopNavigation } from "./pages/TopNavigation";
import { Route, Routes } from "react-router-dom";
import { IntroPage } from "./pages/IntroPage";
import { MainPage } from "./pages/MainPage";
import Footer from "./commonElements/Footer";
import MentoringRoomsPage from "./pages/MentoringRoomsPage";
import RoomPage from "./pages/RoomPage";

export const App = (): JSX.Element => {
  return (
    <AppContainer className="App">
      <TopNavigation />

      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/qrooms" element={<MentoringRoomsPage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>

      {/* <Footer /> */}
    </AppContainer>
  );
};

const AppContainer = styled("div")(({ theme }) => ({
  minWidth: "1080px",
}));

export default App;
