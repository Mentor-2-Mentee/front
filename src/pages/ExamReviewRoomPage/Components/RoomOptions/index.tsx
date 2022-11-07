import { Box, CircularProgress, SxProps, Theme } from "@mui/material";
import { useParams } from "react-router";
import { useGetExamQuestionListQuery } from "../../../../hooks/queries/examQuestion/useGetExamQuestionListQuery";
import { getCookieValue } from "../../../../utils";
import SetExamQuestionCount from "./SetExamQuestionCount";

export const RoomOptions = () => {
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
      <SetExamQuestionCount
        currentQuestionCount={examQuestionListData.examQuestionList.length}
        examReviewRoomId={examReviewRoomId}
      />
    </Box>
  );
};

const OptionBoxSxProps: SxProps<Theme> = (theme: Theme) => ({
  p: 2,
  overflow: "scroll",
  height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(19)} )`,
});

export default RoomOptions;
