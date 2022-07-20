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
import { deleteCookieValues, getCookieValue } from "./utils/handleCookieValue";
import { getUserProfile, UserProfile } from "./api/getUserProfile";
import { RootContext, RootContextProps } from "./hooks/context/RootContext";
import { ModeTag } from "./commonElements/ModeTag";
import CreateRoomPage from "./pages/CreateRoomPage";
import NotFoundPage from "./pages/NotFoundPage";

import { useSnackbar } from "notistack";
import UserProfilePage from "./pages/UserProfilePage";

import { QueryClientProvider } from "react-query";
import queryClient from "./hooks/queries/queryClientInit";
import AdminPage from "./pages/AdminPage";
import { AuthGuard } from "./commonElements/AuthGuard";

export const App = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: undefined,
    username: undefined,
    userGrade: undefined,
  });
  const { enqueueSnackbar } = useSnackbar();

  const setGlobalValue = async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) return;

    try {
      const nowUserProfile: UserProfile = await getUserProfile(accessToken);
      setUserProfile({
        userId: nowUserProfile.userId,
        username: nowUserProfile.username,
        userGrade: nowUserProfile.userGrade,
      });
    } catch (error) {
      deleteCookieValues({ deleteCookieKeys: ["refreshToken", "accessToken"] });
      setUserProfile({
        userId: undefined,
        username: undefined,
      });
      enqueueSnackbar("인증시간이 만료되었습니다. 다시 로그인해주세요.", {
        variant: "warning",
      });
    }
  };

  useEffect(() => {
    setGlobalValue();
  }, []);

  return (
    <RootContext.Provider
      value={{
        userId: userProfile.userId,
        username: userProfile.username,
        userGrade: userProfile.userGrade,
        setRootContext: setUserProfile,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AppContainer className="App">
          {import.meta.env.MODE === "development" ||
          userProfile === "master" ? (
            <ModeTag />
          ) : null}
          <TopNavigation />

          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/create_room" element={<CreateRoomPage />} />
            <Route path="/qrooms" element={<MentoringRoomsPage />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route path="/oauth" element={<OauthPage />} />
            <Route path="/user_profile" element={<UserProfilePage />} />
            <Route
              path="/admin"
              element={
                <AuthGuard>
                  <AdminPage />
                </AuthGuard>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* <Footer /> */}
        </AppContainer>
      </QueryClientProvider>
    </RootContext.Provider>
  );
};

const AppContainer = styled("div")(({ theme }) => ({
  minWidth: "1080px",
}));

export default App;
