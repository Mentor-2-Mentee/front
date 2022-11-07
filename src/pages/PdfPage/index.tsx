import { CircularProgress, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/material";
import { useParams } from "react-router";
import { useGetExamQuestionListQuery } from "../../hooks/queries/examQuestion/useGetExamQuestionListQuery";
import { getCookieValue } from "../../utils";

export const PdfPage = () => {
  const params = useParams();

  const { data: examQuestionListData, status: examQuestionListQueryStatus } =
    useGetExamQuestionListQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId: Number(params.examReviewRoomId),
    });

  if (examQuestionListQueryStatus === "loading") return <CircularProgress />;
  if (examQuestionListQueryStatus === "error") return <div>Error</div>;

  return (
    <Box sx={PdfBoxSxProps}>
      {examQuestionListData.examQuestionList.map((examQuestion, index) => {
        return (
          <Box key={examQuestion.id}>
            <Typography variant="subtitle1" fontWeight={"bold"}>{`${
              index + 1
            }번 문제`}</Typography>
            <Box
              sx={{
                "& img": {
                  width: "100%",
                },
              }}
              dangerouslySetInnerHTML={{ __html: examQuestion.questionText }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

const PdfBoxSxProps: SxProps = {
  display: "grid",
  gridTemplateColumns: "repeat(2,50%)",
  p: 5,
};

export default PdfPage;
