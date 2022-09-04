import { useSnackbar } from "notistack";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootContext } from "../hooks/context/RootContext";
import { getCookieValue } from "../utils/handleCookieValue";
import { useGetUserProfileQuery } from "../hooks/queries/Auth";
import { CircularProgress } from "@mui/material";
import { userGradeCheck } from "../utils/userGradeCheck";

export const AuthGuard = ({
  children,
  enterable,
}: {
  children: JSX.Element;
  enterable: string[];
}): JSX.Element => {
  const { userGrade } = useContext(RootContext);
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const accessToken = getCookieValue("accessToken");
  if (accessToken === undefined) {
    enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
    return <Navigate to="/error" state={{ from: location }} replace />;
  }

  const userProfileQuery = useGetUserProfileQuery(accessToken);

  if (userProfileQuery.status === "loading") {
    return <CircularProgress />;
  }

  const isEnterable = userGradeCheck(
    enterable,
    userProfileQuery.data?.userGrade
  );

  if (isEnterable) {
    return children;
  }

  return <Navigate to="/error" state={{ from: location }} replace />;
};

export default AuthGuard;
