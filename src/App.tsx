import { styled } from "@mui/system";
import { TopNavigation } from "./pages/TopNavigation";
import { Route, Routes } from "react-router-dom";
import { IntroPage } from "./pages/IntroPage";
import { MainPage } from "./pages/MainPage";
import Footer from "./commonElements/Footer";
import MentoringRoomsPage from "./pages/MentoringRoomsPage";
import RoomPage from "./pages/RoomPage";
import { OauthPage } from "./pages/OauthPage";
import { useEffect, useState } from "react";
import { getCookieValue } from "./utils/getCookieValue";
import { getUserProfile, UserProfile } from "./api/getUserProfile";
import { RootContext } from "./context/RootContext";

export const App = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: "",
    userName: "",
  });

  const setGlobalValue = async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) return;

    const nowUserProfile: UserProfile = await getUserProfile(accessToken);
    console.log(nowUserProfile);
    setUserProfile(nowUserProfile);
  };

  useEffect(() => {
    setGlobalValue();
  }, []);

  return (
    <RootContext.Provider value={userProfile}>
      <AppContainer className="App">
        <TopNavigation />

        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/qrooms" element={<MentoringRoomsPage />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
          <Route path="/oauth" element={<OauthPage />} />
        </Routes>

        {/* <Footer /> */}
      </AppContainer>
    </RootContext.Provider>
  );
};

const AppContainer = styled("div")(({ theme }) => ({
  minWidth: "1080px",
}));

export default App;
