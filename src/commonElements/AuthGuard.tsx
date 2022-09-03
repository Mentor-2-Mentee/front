import { useSnackbar } from "notistack";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootContext } from "../hooks/context/RootContext";
import { getCookieValue } from "../utils/handleCookieValue";
import { useGetUserProfileQuery } from "../hooks/queries/Auth";
import { CircularProgress } from "@mui/material";

export const AuthGuard = ({
  children,
  enterable,
}: {
  children: JSX.Element;
  enterable: string[];
}) => {
  const { userGrade } = useContext(RootContext);
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const accessToken = getCookieValue("accessToken");
  if (accessToken === undefined) {
    enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
    return;
  }

  const userProfileQuery = useGetUserProfileQuery(accessToken);

  if (userProfileQuery.status === "loading") {
    return <CircularProgress />;
  }

  const isEnterable = Boolean(
    enterable.findIndex((ele) => ele === userProfileQuery.data?.userGrade) !==
      -1
  );

  if (isEnterable) {
    return children;
  }

  return <Navigate to="/error" state={{ from: location }} replace />;
};

export default AuthGuard;
