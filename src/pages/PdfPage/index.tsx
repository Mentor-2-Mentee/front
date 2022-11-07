import { Height } from "@mui/icons-material";
import { CircularProgress, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import { useGetExamQuestionListQuery } from "../../hooks/queries/examQuestion/useGetExamQuestionListQuery";
import { getCookieValue } from "../../utils";

export const PdfPage = () => {
  const { userName } = useContext(RootContext);
  const params = useParams();

  const { data: examQuestionListData, status: examQuestionListQueryStatus } =
    useGetExamQuestionListQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId: Number(params.examReviewRoomId),
    });

  if (examQuestionListQueryStatus === "loading") return <CircularProgress />;
  if (examQuestionListQueryStatus === "error") return <div>Error</div>;

  const { examOrganizer, examType } = examQuestionListData.examQuestionList[0];

  return (
    <Box sx={PdfBoxSxProps}>
      {/* <Typography
        variant="h3"
        sx={{
          position: "absolute",
          zIndex: -1,
          opacity: 0.03,
          lineHeight: "100px",
        }}
      >
        {`${userName} `.repeat(500)}
      </Typography> */}
      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          top: 40,
          left: 56,
        }}
      >
        {`${examOrganizer} ${examType} ()`}
      </Typography>
      {examQuestionListData.examQuestionList.map((examQuestion, index) => {
        return (
          <Box key={examQuestion.id} sx={QuestionBoxSxProps}>
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
  pt: 10,
  position: "relative",
  zIndex: 0,

  width: "210mm",
  height: "297mm",
};

const QuestionBoxSxProps: SxProps = {
  m: 2,
};

export default PdfPage;
