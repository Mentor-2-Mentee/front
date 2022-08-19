import { styled } from "@mui/system";
import { MainPagePostsParams } from "./MainPageUserData";
import { MainPagePostsGrid } from "../../../commonElements/MainPagePostsGrid";
import { Typography } from "@mui/material";

interface MyAnswersProps {
  myAnswers: MainPagePostsParams[];
}

export const MyAnswers = ({ myAnswers }: MyAnswersProps): JSX.Element => {
  return (
    <MyAnswersContainer>
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: "bold", ml: 1, mb: 1 }}
      >
        {`내가 답변한 문제들 (${myAnswers.length})`}
      </Typography>
      <MainPagePostsGrid postsList={myAnswers} />
    </MyAnswersContainer>
  );
};

const MyAnswersContainer = styled("div")(({ theme }) => ({}));

export default MyAnswers;
