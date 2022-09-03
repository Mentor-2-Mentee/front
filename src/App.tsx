import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import TopNavigation from "./pages/TopNavigation";
import IntroPage from "./pages/IntroPage";
import MainPage from "./pages/MainPage";
import OauthPage from "./pages/OauthPage";
import MentoringRoomListPage from "./pages/MentoringRoomListPage";
import RoomPage from "./pages/RoomPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import Footer from "./commonElements/Footer";
import UserProfilePage from "./pages/UserProfilePage";
import queryClient from "./hooks/queries/queryClientInit";
import AdminPage from "./pages/AdminPage";
import AuthGuard from "./commonElements/AuthGuard";
import TestSchedulePage from "./pages/TestSchedulePage";
import CreateTestSchedulePage from "./pages/CreateTestSchedulePage";
import NotFoundPage from "./pages/NotFoundPage";

import { deleteCookieValues, getCookieValue } from "./utils/handleCookieValue";
import { getUserProfile, UserProfile } from "./api/user/getUserProfile";
import { RootContext } from "./hooks/context/RootContext";
import { ModeTag } from "./commonElements/ModeTag";
import { testScheduleQueryClient } from "./hooks/queries/testSchedule";
import TestMentoringRoomPage from "./pages/TestMentoringRoomPage";

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
    <AppContainer className="App">
      <RootContext.Provider
        value={{
          userId: userProfile.userId,
          username: userProfile.username,
          userGrade: userProfile.userGrade,
          setRootContext: setUserProfile,
        }}
      >
        <QueryClientProvider client={queryClient}>
          {import.meta.env.MODE === "development" ||
          userProfile.userGrade === "master" ? (
            <ModeTag />
          ) : null}
          <TopNavigation />

          <Routes>
            {/* <Route path="/" element={<IntroPage />} /> 인트로 페이지 완성전까지 main으로 대체*/}
            <Route path="/" element={<MainPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/create_room" element={<CreateRoomPage />} />
            <Route path="/qrooms" element={<MentoringRoomListPage />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route
              path="test-schedule"
              element={
                <QueryClientProvider client={testScheduleQueryClient}>
                  <TestSchedulePage />
                </QueryClientProvider>
              }
            />
            <Route
              path="/create_test-schedule"
              element={
                <AuthGuard enterable={["master", "admin", "user"]}>
                  <QueryClientProvider client={testScheduleQueryClient}>
                    <CreateTestSchedulePage />
                  </QueryClientProvider>
                </AuthGuard>
              }
            />
            <Route
              path="/test-mentoring-room/:roomId"
              element={
                <AuthGuard enterable={["master", "admin", "user"]}>
                  <TestMentoringRoomPage />
                </AuthGuard>
              }
            />
            <Route path="/oauth" element={<OauthPage />} />
            <Route path="/user_profile" element={<UserProfilePage />} />
            <Route
              path="/admin"
              element={
                <AuthGuard enterable={["master", "admin"]}>
                  <AdminPage />
                </AuthGuard>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* <Footer /> */}
        </QueryClientProvider>
      </RootContext.Provider>
    </AppContainer>
  );
};

const AppContainer = styled("div")(({ theme }) => ({
  minWidth: "1080px",

  "@media screen and (width:600px)": {
    width: 300,
  },
}));

export default App;
