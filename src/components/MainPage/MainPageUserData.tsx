import { styled } from "@mui/system";
import MyAnswers from "./MyAnswers";
import MyQuestions from "./MyQuestions";

import { MY_QUESTIONS, MY_ANSWERS } from "./DEV_DATA.json";
import { CommonSpace } from "../../commonStyles/CommonSpace";

export interface MainPagePostsParams {
  postId: string;
  postTitle: string;
  commentsCount: number;
  isLive: boolean;
  isClosed: boolean;
}

export const MainPageUserData = (): JSX.Element => {
  return (
    <MainPageUserDataContainer>
      <MyQuestions myQuestions={MY_QUESTIONS} />
      <MyAnswers myAnswers={MY_ANSWERS} />
    </MainPageUserDataContainer>
  );
};

const MainPageUserDataContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(2,calc(50% - ${CommonSpace.MARGIN}px ))`,
  padding: theme.spacing(CommonSpace.MARGIN),
}));

export default MainPageUserData;
