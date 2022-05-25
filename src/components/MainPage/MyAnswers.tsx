import { styled } from "@mui/system";
import { MainPagePostsParams } from "./MainPageUserData";
import { MainPagePostsGrid } from "../../commonElements/MainPagePostsGrid";

interface MyAnswersProps {
  myAnswers: MainPagePostsParams[];
}

export const MyAnswers = ({ myAnswers }: MyAnswersProps): JSX.Element => {
  return (
    <MyAnswersContainer>
      내가 답변한 문제들
      <MainPagePostsGrid postsList={myAnswers} />
    </MyAnswersContainer>
  );
};

const MyAnswersContainer = styled("div")(({ theme }) => ({}));

export default MyAnswers;
