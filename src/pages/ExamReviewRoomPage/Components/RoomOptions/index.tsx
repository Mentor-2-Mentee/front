import { Box, Button, CircularProgress, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router";
import { RootContext } from "../../../../hooks/context/RootContext";
import { useGetExamQuestionListQuery } from "../../../../hooks/queries/examQuestion/useGetExamQuestionListQuery";
import { getCookieValue, userGradeCheck } from "../../../../utils";
import ExitRoom from "./ExitRoom";
import SetExamQuestionCount from "./SetExamQuestionCount";

export const RoomOptions = () => {
  const { userGrade } = useContext(RootContext);
  const params = useParams();
  const examReviewRoomId = Number(params.examReviewRoomId);

  const { data: examQuestionListData, status: examQuestionQueryStatus } =
    useGetExamQuestionListQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId,
    });

  if (examQuestionQueryStatus === "loading") return <CircularProgress />;
  if (examQuestionQueryStatus === "error") return <div>Error</div>;

  return (
    <Box sx={OptionBoxSxProps}>
      {userGradeCheck(["master", "admin"], userGrade) ? (
        <SetExamQuestionCount
          currentQuestionCount={examQuestionListData.examQuestionList.length}
          examReviewRoomId={examReviewRoomId}
        />
      ) : null}

      <ExitRoom />
    </Box>
  );
};

const OptionBoxSxProps: SxProps<Theme> = (theme: Theme) => ({
  // p: 2,
  // overflow: "scroll",
  // height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(19)} )`,
});

export default RoomOptions;
