import { Box, Typography, useMediaQuery, SxProps } from "@mui/material";
import { styled } from "@mui/system";
import { MainPagePostsParams } from "./MainPageUserData";
import { MainPagePostsGrid } from "../../../commonElements/MainPagePostsGrid";
import { useContext } from "react";
import { RootContext } from "../../../hooks/context/RootContext";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { Question, QuestionPost } from "../../../hooks/queries/questionPost";

interface MyQuestionsProps {
  myQuestions: Pick<QuestionPost, "id" | "title">[];
}

export const MyQuestions = ({ myQuestions }: MyQuestionsProps): JSX.Element => {
  const { id } = useContext(RootContext);
  const isAuthorized = Boolean(id);

  return (
    <Box>
      <Typography
        variant="h6"
        component="div"
        fontWeight={"bold"}
        sx={{ fontWeight: "bold", ml: 1, mb: 1 }}
      >
        {`나의 질문 (${myQuestions.length})`}
      </Typography>
      <MainPagePostsGrid postsList={myQuestions} />
    </Box>
  );
};

export default MyQuestions;
