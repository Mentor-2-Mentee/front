import {
  Button,
  CircularProgress,
  Modal,
  Theme,
  Typography,
} from "@mui/material";
import { Box, SxProps } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { ExamQuestion } from "../../hooks/queries/examQuestion";
import { useGetExamQuestionListQuery } from "../../hooks/queries/examQuestion/useGetExamQuestionListQuery";
import { useGetExamReviewRoomQuery } from "../../hooks/queries/examReviewRoom";
import { getCookieValue } from "../../utils";

export const PdfPage = () => {
  const params = useParams();
  const [searchParams, _] = useSearchParams();
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(true);
  const isSolution = searchParams.get("solution") === "true";
  const handleInfoModalClose = () => setInfoModalOpen(false);

  const { data: examReviewRoomData, status: examReviewRoomQueryStatus } =
    useGetExamReviewRoomQuery({
      examReviewRoomId: Number(params["examReviewRoomId"]),
    });

  const { data: examQuestionListData, status: examQuestionListQueryStatus } =
    useGetExamQuestionListQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId: Number(params["examReviewRoomId"]),
    });

  if (
    examQuestionListQueryStatus === "loading" ||
    examReviewRoomQueryStatus === "loading"
  )
    return <CircularProgress />;
  if (
    examQuestionListQueryStatus === "error" ||
    examReviewRoomQueryStatus === "error"
  )
    return <div>Error</div>;
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
      <Modal open={infoModalOpen} onClose={handleInfoModalClose}>
        <Box sx={InfoModalBoxSxProps}>
          <Typography
            sx={{ whiteSpace: "pre", mb: 4 }}
          >{`다음의 방법으로 PDF파일로 저장하세요\n\nCtrl + P (Window)\nCommend + P (Mac)\n\n이후 "PDF 출력" 설정 후 저장`}</Typography>
          <Button variant="contained" onClick={handleInfoModalClose}>
            닫기
          </Button>
        </Box>
      </Modal>
      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          top: 40,
          left: 56,
        }}
      >
        {`${examOrganizer} ${examType} ${isSolution ? "풀이" : ""} (${
          examReviewRoomData.examDate
        }) `}
      </Typography>
      {examQuestionListData.examQuestionList.map((examQuestion, index) => {
        return (
          <ExamQuestionElement
            key={examQuestion.id}
            questionIndex={index}
            examQuestion={examQuestion}
            isSolution={isSolution}
          />
        );
      })}
    </Box>
  );
};

interface ExamQuestionElementProps {
  questionIndex: number;
  examQuestion: ExamQuestion;
  isSolution?: boolean;
}

const ExamQuestionElement = ({
  questionIndex,
  examQuestion,
  isSolution,
}: ExamQuestionElementProps) => {
  if (isSolution === true)
    return (
      <Box key={examQuestion.id} sx={QuestionBoxSxProps}>
        <Typography variant="subtitle1" fontWeight={"bold"}>{`${
          questionIndex + 1
        }번 문제 풀이`}</Typography>
        <Box
          sx={{
            "& img": {
              width: "100%",
            },
          }}
          dangerouslySetInnerHTML={{ __html: examQuestion.solution }}
        />
      </Box>
    );

  return (
    <Box key={examQuestion.id} sx={QuestionBoxSxProps}>
      <Typography variant="subtitle1" fontWeight={"bold"}>{`${
        questionIndex + 1
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
};

const PdfBoxSxProps: SxProps = {
  display: "grid",
  gridTemplateColumns: "repeat(2,50%)",
  p: 5,
  pt: 10,
  position: "relative",
  zIndex: 0,
  backgroundColor: SignatureColor.WHITE,

  width: "210mm",
  height: "297mm",
};

const QuestionBoxSxProps: SxProps = {
  m: 2,
};

const InfoModalBoxSxProps: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4, 4, 5, 4),
  marginBottom: theme.spacing(20),
  display: "flex",
  flexFlow: "column",

  width: theme.spacing(40),
});

export default PdfPage;
