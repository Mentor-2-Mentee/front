import { styled } from "@mui/system";
import MyAnswers from "./MyAnswers";
import MyQuestions from "./MyQuestions";

import { CommonSpace } from "../../../commonStyles/CommonSpace";
import { Box, useMediaQuery } from "@mui/material";

export interface MainPagePostsParams {
  postId: string;
  postTitle: string;
  commentsCount: number;
  isLive: boolean;
  isClosed: boolean;
}

export const MainPageUserData = (): JSX.Element => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  return (
    <Box
      sx={(theme) => ({
        display: isWidthShort ? "flex" : "grid",
        gridTemplateColumns: `repeat(2,calc(50% - ${CommonSpace.MARGIN}px ))`,
        flexFlow: isWidthShort ? "column" : "unset",
        padding: isWidthShort ? 4 : 8,
      })}
    >
      <MyQuestions myQuestions={[]} />
      <MyAnswers myAnswers={[]} />
    </Box>
  );
};

export default MainPageUserData;
