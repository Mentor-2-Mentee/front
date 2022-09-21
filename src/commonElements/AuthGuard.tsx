import { useSnackbar } from "notistack";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootContext } from "../hooks/context/RootContext";
import { getCookieValue } from "../utils/handleCookieValue";
import { useGetUserProfileQuery } from "../hooks/queries/auth";
import { CircularProgress } from "@mui/material";
import { userGradeCheck } from "../utils/userGradeCheck";

interface AuthGuardProps {
  children: JSX.Element;
  enterable: string[];
}

export const AuthGuard = ({
  children,
  enterable,
}: AuthGuardProps): JSX.Element => {
  const { userGrade } = useContext(RootContext);
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const token = getCookieValue("accessToken");

  if (!token) {
    enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
    return <Navigate to="/error" state={{ from: location }} replace />;
  }

  const userProfileQuery = useGetUserProfileQuery({ token });

  if (userProfileQuery.status === "loading") {
    return <CircularProgress />;
  }
  if (userProfileQuery.status === "error") {
    return <Navigate to="/error" state={{ from: location }} replace />;
  }

  const isEnterable = userGradeCheck(
    enterable,
    userProfileQuery.data.userProfile.userGrade
  );

  if (isEnterable) {
    return children;
  }
  return <Navigate to="/error" state={{ from: location }} replace />;
};

export default AuthGuard;
