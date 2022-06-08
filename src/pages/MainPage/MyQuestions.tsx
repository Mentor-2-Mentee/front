import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { MainPagePostsParams } from "./MainPageUserData";
import { MainPagePostsGrid } from "../../commonElements/MainPagePostsGrid";

interface MyQuestionsProps {
  myQuestions: MainPagePostsParams[];
}

export const MyQuestions = ({ myQuestions }: MyQuestionsProps): JSX.Element => {
  return (
    <MyQuestionsContainer>
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: "bold", ml: 1, mb: 1 }}
      >
        {`내가 질문한 문제들 (${myQuestions.length})`}
      </Typography>
      <MainPagePostsGrid postsList={myQuestions} />
    </MyQuestionsContainer>
  );
};

const MyQuestionsContainer = styled("div")(({ theme }) => ({}));

export default MyQuestions;
