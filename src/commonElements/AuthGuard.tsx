import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootContext } from "../hooks/context/RootContext";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { userGrade } = useContext(RootContext);
  const location = useLocation();

  if (userGrade === "master") {
    return children;
  } else {
    return <Navigate to="/error" state={{ from: location }} replace />;
  }
};

export default AuthGuard;
