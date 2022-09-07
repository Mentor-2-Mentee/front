import { lazy, Suspense, useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import TopNavigation from "./pages/TopNavigation";
import Footer from "./commonElements/Footer";
import AuthGuard from "./commonElements/AuthGuard";

const IntroPage = lazy(() => import("./pages/IntroPage"));
const MainPage = lazy(() => import("./pages/MainPage"));
const OauthPage = lazy(() => import("./pages/OauthPage"));
const MentoringRoomListPage = lazy(
  () => import("./pages/MentoringRoomListPage")
);
const RoomPage = lazy(() => import("./pages/RoomPage"));
const CreateRoomPage = lazy(() => import("./pages/CreateRoomPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ExamSchedulePage = lazy(() => import("./pages/ExamSchedulePage"));
const CreateExamSchedulePage = lazy(
  () => import("./pages/CreateExamSchedulePage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ExamMentoringRoomPage = lazy(
  () => import("./pages/ExamMentoringRoomPage")
);

import queryClient from "./hooks/queries/queryClientInit";
import { deleteCookieValues, getCookieValue } from "./utils/handleCookieValue";
import { getUserProfile, UserProfile } from "./api/user/getUserProfile";
import { RootContext } from "./hooks/context/RootContext";
import { ModeTag } from "./commonElements/ModeTag";
import { examScheduleQueryClient } from "./hooks/queries/examSchedule";

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
          {/* {import.meta.env.MODE === "development" ||
          userProfile.userGrade === "master" ? (
            <ModeTag />
          ) : null} */}
          <TopNavigation />

          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* <Route path="/" element={<IntroPage />} /> 인트로 페이지 완성전까지 main으로 대체*/}
              <Route path="/" element={<MainPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/create_room" element={<CreateRoomPage />} />
              <Route path="/qrooms" element={<MentoringRoomListPage />} />
              <Route path="/room/:roomId" element={<RoomPage />} />
              <Route
                path="exam-schedule"
                element={
                  <QueryClientProvider client={examScheduleQueryClient}>
                    <ExamSchedulePage />
                  </QueryClientProvider>
                }
              />
              <Route
                path="/create_exam-schedule"
                element={
                  <AuthGuard enterable={["master", "admin", "user"]}>
                    <QueryClientProvider client={examScheduleQueryClient}>
                      <CreateExamSchedulePage />
                    </QueryClientProvider>
                  </AuthGuard>
                }
              />
              <Route
                path="/exam-mentoring-room/:roomId"
                element={
                  // <AuthGuard enterable={["master", "admin", "user"]}>
                  <ExamMentoringRoomPage />
                  // </AuthGuard>
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
          </Suspense>

          {/* <Footer /> */}
        </QueryClientProvider>
      </RootContext.Provider>
    </AppContainer>
  );
};

const AppContainer = styled("div")(({ theme }) => ({
  // minWidth: "1080px",
}));

export default App;
