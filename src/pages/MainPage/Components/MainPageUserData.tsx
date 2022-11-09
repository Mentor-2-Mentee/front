import MyReviewRooms from "./MyReviewRooms";
import MyQuestions from "./MyQuestions";

import { CommonSpace } from "../../../commonStyles/CommonSpace";
import {
  Box,
  Typography,
  useMediaQuery,
  SxProps,
  CircularProgress,
} from "@mui/material";
import { useContext } from "react";
import { RootContext } from "../../../hooks/context/RootContext";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useGetUserQuestionPostQuery } from "../../../hooks/queries/userProfile/useGetUserQuestionPostQuery";
import { getCookieValue } from "../../../utils";

export interface MainPagePostsParams {
  postId: string;
  postTitle: string;
  commentsCount: number;
  isLive: boolean;
  isClosed: boolean;
}

export const MainPageUserData = (): JSX.Element => {
  const isAuthorized = Boolean(getCookieValue("accessToken"));
  const isWidthShort = useMediaQuery("(max-width:900px)");

  if (!isAuthorized) return <div>{null}</div>;

  return (
    <Box sx={DataDisplayBoxSxProps(isWidthShort, isAuthorized)}>
      <MyQuestions />
      <MyReviewRooms />
    </Box>
  );
};

const DataDisplayBoxSxProps = (
  isWidthShort: boolean,
  isAuthorized: boolean
): SxProps => ({
  display: isWidthShort ? "flex" : "grid",
  gridTemplateColumns: `repeat(2,calc(50% - ${CommonSpace.MARGIN}px ))`,
  flexFlow: isWidthShort ? "column" : "unset",
  padding: isWidthShort ? 4 : 8,

  filter: isAuthorized ? "unset" : "blur(3px)",
});

export default MainPageUserData;
