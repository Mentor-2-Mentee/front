import MyAnswers from "./MyAnswers";
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
  const { id } = useContext(RootContext);
  const isAuthorized = Boolean(id);
  const isWidthShort = useMediaQuery("(max-width:900px)");

  const userQuestionPostQuery = useGetUserQuestionPostQuery({
    token: getCookieValue("accessToken"),
  });

  if (userQuestionPostQuery.status === "loading") return <CircularProgress />;
  if (userQuestionPostQuery.status === "error") return <div>Error</div>;

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 0,
      }}
    >
      {isAuthorized ? null : (
        <Typography
          variant="h6"
          fontWeight={"bold"}
          color={SignatureColor.BLACK_80}
          sx={UnauthorizedDisplaySxProps}
        >
          로그인 후 확인 가능합니다
        </Typography>
      )}
      <Box sx={DataDisplayBoxSxProps(isWidthShort, isAuthorized)}>
        <MyQuestions myQuestions={userQuestionPostQuery.data.questionPost} />
        <MyAnswers myAnswers={[]} />
      </Box>
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

const UnauthorizedDisplaySxProps: SxProps = {
  position: "absolute",
  zIndex: 1,
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
};

export default MainPageUserData;
