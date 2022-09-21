import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, useLocation } from "react-router-dom";

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

import { deleteCookieValues, getCookieValue } from "./utils/handleCookieValue";
import { RootContext, RootContextState } from "./hooks/context/RootContext";
import { ModeTag } from "./commonElements/ModeTag";
import { examScheduleQueryClient } from "./hooks/queries/examSchedule";
import { examMentoringRoomQueryClient } from "./hooks/queries/examMentoringRoom";
import { useGetUserProfileQuery, UserProfile } from "./hooks/queries/auth";

export const App = (): JSX.Element => {
  const [rootContextState, setRootContextState] = useState<RootContextState>({
    userId: undefined,
    username: undefined,
    userGrade: undefined,
  });
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const token = getCookieValue("accessToken");
  const userProfileQuery = useGetUserProfileQuery({ token });

  const getCurrentFullPath = useCallback(() => {
    let isOauth: boolean = false;
    const fullPath = Object.entries(location)
      .map(([key, value]) => {
        if (key === "key") return;
        if (value === "/oauth") {
          isOauth = true;
        }
        return value;
      })
      .join("");
    return isOauth ? null : fullPath;
  }, [location]);

  useEffect(() => {
    if (userProfileQuery.status === "error") {
      deleteCookieValues({ deleteCookieKeys: ["refreshToken", "accessToken"] });
      setRootContextState((currentState) => ({
        ...currentState,
        userId: undefined,
        username: undefined,
        userGrade: undefined,
      }));
      enqueueSnackbar("인증시간이 만료되었습니다. 다시 로그인해주세요.", {
        variant: "warning",
      });
    }
    if (userProfileQuery.status !== "success") return;
    setRootContextState((currentState) => ({
      ...currentState,
      userId: userProfileQuery.data.userProfile.userId,
      username: userProfileQuery.data.userProfile.username,
      userGrade: userProfileQuery.data.userProfile.userGrade,
    }));
  }, [userProfileQuery.status, userProfileQuery.data]);

  useEffect(() => {
    const currentfullPath = getCurrentFullPath();
    if (!currentfullPath) return;
    window.localStorage.setItem("latestPath", currentfullPath);
  }, [getCurrentFullPath]);

  return (
    <AppContainer className="App">
      <RootContext.Provider
        value={{
          ...rootContextState,
          setRootContextState,
        }}
      >
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
              path="/exam-mentoring-room/:examScheduleId/:examField"
              element={
                <AuthGuard enterable={["master", "admin", "user"]}>
                  <QueryClientProvider client={examMentoringRoomQueryClient}>
                    <ExamMentoringRoomPage />
                  </QueryClientProvider>
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
        </Suspense>

        {/* <Footer /> */}
      </RootContext.Provider>
    </AppContainer>
  );
};

const AppContainer = styled("div")({
  minWidth: "360px",
});

export default App;
