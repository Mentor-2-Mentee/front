import { Box, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router";
import { RootContext } from "../../../../hooks/context/RootContext";
import { useGetExamQuestionListQuery } from "../../../../hooks/queries/examQuestion/useGetExamQuestionListQuery";
import { getCookieValue, userGradeCheck } from "../../../../utils";
import CloseRoom from "./CloseRoom";
import RestrictionRoom from "./RestrictionRoom";
import ExitRoom from "./ExitRoom";
import SetExamQuestionCount from "./SetExamQuestionCount";
import ArchivedRoom from "./ArchivedRoom";

export const RoomOptions = () => {
  const { userGrade } = useContext(RootContext);
  const params = useParams();
  const examReviewRoomId = Number(params["examReviewRoomId"]);

  const { data: examQuestionListData, status: examQuestionQueryStatus } =
    useGetExamQuestionListQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId,
    });

  if (examQuestionQueryStatus === "loading") return <CircularProgress />;
  if (examQuestionQueryStatus === "error") return <div>Error</div>;

  return (
    <Box>
      {userGradeCheck(["master", "admin"], userGrade) ? (
        <SetExamQuestionCount
          currentQuestionCount={examQuestionListData.examQuestionList.length}
          examReviewRoomId={examReviewRoomId}
        />
      ) : null}

      {userGradeCheck(["master", "admin"], userGrade) ? <ArchivedRoom /> : null}
      {userGradeCheck(["master", "admin"], userGrade) ? (
        <RestrictionRoom />
      ) : null}
      {userGradeCheck(["master", "admin"], userGrade) ? <CloseRoom /> : null}
      <ExitRoom />
    </Box>
  );
};

export default RoomOptions;
