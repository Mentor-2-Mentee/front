import { styled } from "@mui/system";
import { TopNavigation } from "./pages/TopNavigation";
import { Route, Routes } from "react-router-dom";
import { IntroPage } from "./pages/IntroPage";
import { MainPage } from "./pages/MainPage";
import Footer from "./commonElements/Footer";
import MentoringRoomsPage from "./pages/MentoringRoomsPage";
import RoomPage from "./pages/RoomPage";
import { OauthPage } from "./pages/OauthPage";
import { useContext, useEffect, useState } from "react";
import { getCookieValue } from "./utils/handleCookieValue";
import { getUserProfile, UserProfile } from "./api/getUserProfile";
import { RootContext, RootContextProps } from "./context/RootContext";
import { DevelopmentTag } from "./commonElements/DevelopmentTag";

export const App = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: undefined,
    userName: undefined,
  });

  const setGlobalValue = async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) return;

    const nowUserProfile: UserProfile = await getUserProfile(accessToken);
    setUserProfile({
      userId: nowUserProfile.userId,
      userName: nowUserProfile.userName,
    });
  };

  useEffect(() => {
    setGlobalValue();
  }, []);

  return (
    <RootContext.Provider
      value={{
        userId: userProfile.userId,
        userName: userProfile.userName,
        setRootContext: setUserProfile,
      }}
    >
      <AppContainer className="App">
        {import.meta.env.MODE === "development" ? <DevelopmentTag /> : null}
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
