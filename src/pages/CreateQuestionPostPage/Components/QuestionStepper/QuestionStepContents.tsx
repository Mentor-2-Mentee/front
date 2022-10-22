import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import FilterOptionHandler, {
  FilterOption,
} from "../../../../commonElements/FilterOptionHandler";
import ImageUpload, { ImageFile } from "../../../../commonElements/ImageUpload";
import {
  QuestionForm,
  UploadType,
} from "../../../../hooks/queries/questionPost";
import {
  QuestionTag,
  useGetQuestionTagQuery,
} from "../../../../hooks/queries/questionTag";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { InputMentoringRoomTitle } from "../InputMentoringRoomTitle";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { getCookieValue } from "../../../../utils";
import { useSnackbar } from "notistack";
import { usePostImageMutation } from "../../../../hooks/queries/images/usePostImageMutation";
import PostEditer from "../../../../commonElements/PostEditer";
import { QuestionType } from "../../../../hooks/queries/examReviewRoom";

interface StepContentsProps {
  stepIndex: number;
  useQuestionFormState: [
    QuestionForm,
    React.Dispatch<React.SetStateAction<QuestionForm>>
  ];
}

export const QuestionStepContents = ({
  stepIndex,
  useQuestionFormState,
}: StepContentsProps) => {
  const [questionForm, setQuestionForm] = useQuestionFormState;

  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });
  const [uploadType, setUploadType] = useState<keyof typeof UploadType>();
  const [questionType, setQuestionType] =
    useState<QuestionType>("MULTIPLE_CHOICE");
  const [questionImageFile, setQuestionImageFile] = useState<ImageFile[]>([]);
  const [questionImageUrl, setQuestionImageUrl] = useState<string[]>([]);
  const [questionText, setQuestionText] = useState<string>();
  const [answerExample, setAnswerExample] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [questionPostTitle, setQuestionPostTitle] = useState<string>("");
  const [questionPostDescription, setQuestionPostDescription] =
    useState<string>("");

  const [open, setOpen] = useState(false);
  const [tagList, setTagList] = useState<QuestionTag[]>([]);

  const { enqueueSnackbar } = useSnackbar();
  const questionTagQuery = useGetQuestionTagQuery();
  const postQuestionImageMutation = usePostImageMutation(
    enqueueSnackbar,
    setQuestionImageUrl,
    setOpen
  );

  const handleUploadTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "TEXT") {
      setUploadType("TEXT");
    }
    if (event.target.value === "IMAGE") {
      setUploadType("IMAGE");
    }
  };

  const handleQuestionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "ESSAY_QUESTION") {
      setQuestionType("ESSAY_QUESTION");
    }
    if (event.target.value === "MULTIPLE_CHOICE") {
      setQuestionType("MULTIPLE_CHOICE");
    }
  };

  const handleQuestionTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setQuestionText(event.target.value);

  const handleAnswerExampleChange =
    (answerIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentAnswerExample = answerExample.concat();
      currentAnswerExample[answerIndex] = event.target.value;
      setAnswerExample(currentAnswerExample);
    };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (questionTagQuery.status !== "success") return;
    setTagList(questionTagQuery.data.questionTagList);
  }, [questionTagQuery.status, questionTagQuery.data]);

  //step 1
  useEffect(() => {
    setQuestionForm({
      ...questionForm,
      question: {
        ...questionForm.question,
        rootTag: appliedTagOptions.rootFilterTag,
        detailTag: appliedTagOptions.childFilterTags.map((tag) => tag.tagName),
      },
    });
  }, [appliedTagOptions]);

  //step 2
  useEffect(() => {
    setQuestionForm({
      ...questionForm,
      uploadType: uploadType,
    });
  }, [uploadType]);

  //step 3
  useEffect(() => {
    setQuestionForm({
      ...questionForm,
      question: {
        ...questionForm.question,
        questionText: questionText,
      },
    });
  }, [questionText]);

  useEffect(() => {
    setQuestionForm({
      ...questionForm,
      question: {
        ...questionForm.question,
        questionImageUrl: questionImageUrl,
      },
    });
  }, [questionImageUrl]);

  useEffect(() => {
    setQuestionForm({
      ...questionForm,
      question: {
        ...questionForm.question,
        questionType: questionType,
      },
    });
  }, [questionType]);

  useEffect(() => {
    setQuestionForm({
      ...questionForm,
      question: {
        ...questionForm.question,
        questionType:
          answerExample.length > 1 ? "MULTIPLE_CHOICE" : "ESSAY_QUESTION",
        answerExample: answerExample,
      },
    });
  }, [answerExample]);

  //step 4
  useEffect(() => {
    setQuestionForm({
      ...questionForm,
      questionPostTitle: questionPostTitle,
    });
  }, [questionPostTitle]);

  useEffect(() => {
    setQuestionForm({
      ...questionForm,
      questionPostDescription: questionPostDescription,
    });
  }, [questionPostDescription]);

  switch (stepIndex) {
    case 0:
      return (
        <>
          <FilterOptionHandler
            tagList={tagList}
            useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
            tagOnly
            tagLineSeparate
          />
          {/* {appliedTagOptions.rootFilterTag === undefined ? null : (
            <div>혹시 이런 문제가 궁금하신건가요? (클릭시 이동)</div>
          )} */}
        </>
      );

    case 1:
      return (
        <FormControl>
          <FormLabel>한가지만 선택해주세요</FormLabel>
          <RadioGroup value={uploadType} onChange={handleUploadTypeChange}>
            <FormControlLabel
              value="TEXT"
              control={<Radio />}
              label={UploadType.TEXT}
            />
            <FormControlLabel
              value="IMAGE"
              control={<Radio />}
              label={UploadType.IMAGE}
            />
          </RadioGroup>
        </FormControl>
      );

    case 2:
      if (questionForm.uploadType === "IMAGE")
        return (
          <Box
            sx={{
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
            }}
          >
            <FormControl>
              <FormLabel>하나를 선택해주세요</FormLabel>
              <RadioGroup
                value={questionType}
                onChange={handleQuestionTypeChange}
              >
                <FormControlLabel
                  value="ESSAY_QUESTION"
                  control={<Radio />}
                  label={"주관식"}
                />
                <FormControlLabel
                  value="MULTIPLE_CHOICE"
                  control={<Radio />}
                  label={"객관식"}
                />
              </RadioGroup>
            </FormControl>
            <ImageUpload
              useImageUrlState={[questionImageUrl, setQuestionImageUrl]}
              multipleUpload
            />
            <Button
              variant="contained"
              sx={{ width: 250, mb: 2 }}
              disabled={postQuestionImageMutation.isLoading}
              onClick={() => {
                const accessToken = getCookieValue("accessToken");
                // postQuestionImageMutation.mutate({
                //   token: accessToken,
                //   imageFileList: questionImageFile,
                // });
              }}
            >
              {postQuestionImageMutation.isLoading
                ? "Loading..."
                : questionImageFile.length !== 0 &&
                  questionImageFile.length === questionImageUrl.length
                ? "업로드 완료"
                : "업로드"}
            </Button>
          </Box>
        );
      return (
        <Box>
          <FormControl variant="filled" sx={{ mb: 1, pl: 1, pr: 1 }}>
            <InputLabel sx={{ pl: 2 }}>문제 본문</InputLabel>
            <OutlinedInput
              multiline
              rows={5}
              value={questionText}
              onChange={handleQuestionTextChange}
              sx={{ pt: 3, mb: 1 }}
            />
            {questionImageUrl[0] ? (
              <img
                src={questionImageUrl[0]}
                alt={`문제 이미지`}
                style={{
                  width: "100%",
                  maxWidth: 400,
                }}
              />
            ) : null}
            <Button sx={{ mb: 1 }} onClick={handleOpen}>
              {questionImageFile[0]
                ? "문제 본문 이미지 수정"
                : "문제 본문 이미지 추가"}
            </Button>
            {questionImageFile[0] ? (
              <Button
                color="error"
                onClick={() => {
                  setQuestionImageUrl([]);
                }}
              >
                {"이미지 삭제"}
              </Button>
            ) : null}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: SignatureColor.GRAY,
                  borderRadius: 3,
                  width: 300,
                  boxShadow: 24,
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "center",

                  "& > *": {
                    mb: 1,
                  },
                }}
              >
                <ImageUpload
                  useImageUrlState={[questionImageUrl, setQuestionImageUrl]}
                  // imageFileList={questionImageFile}
                  // setImageFileList={setQuestionImageFile}
                  // uploadOnlyOne
                />
                {/* <Button
                  variant="contained"
                  sx={{ width: 250, mb: 2 }}
                  disabled={postQuestionImageMutation.isLoading}
                  onClick={() => {
                    const accessToken = getCookieValue("accessToken");
                    postQuestionImageMutation.mutate({
                      token: accessToken,
                      imageFileList: questionImageFile,
                    });
                  }}
                >
                  {postQuestionImageMutation.isLoading
                    ? "Loading..."
                    : "업로드"}
                </Button> */}
              </Box>
            </Modal>
            {answerExample.map((answer, index) => {
              return (
                <FormControl
                  variant="filled"
                  key={index}
                  sx={{ mb: 2, position: "relative" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mr: 1, whiteSpace: "nowrap" }}
                    >
                      {answerExample.length === 1
                        ? "주관식"
                        : `보기 ${index + 1}`}
                    </Typography>
                    <OutlinedInput
                      size="small"
                      value={answer}
                      onChange={handleAnswerExampleChange(index)}
                    />
                    <IconButton
                      color="error"
                      onClick={() => {
                        const newAnswerExample = answerExample.filter(
                          (answer, answerIndex) => answerIndex !== index
                        );
                        setAnswerExample(newAnswerExample);
                      }}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </Box>
                </FormControl>
              );
            })}
            <IconButton
              color="primary"
              onClick={() => {
                setAnswerExample([...answerExample, ""]);
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </FormControl>
        </Box>
      );

    case 3:
      return (
        <Box sx={{ mb: 2, "& > *": { mb: 1 } }}>
          <Typography variant="subtitle1">게시글 제목</Typography>
          <InputMentoringRoomTitle
            useMentoringRoomTitleState={[
              questionPostTitle,
              setQuestionPostTitle,
            ]}
          />
          <Typography variant="subtitle1">상세 질의 내용</Typography>
          <PostEditer
            usePostState={[questionPostDescription, setQuestionPostDescription]}
          />
        </Box>
      );

    default:
      return <div>{null}</div>;
  }
};

export default QuestionStepContents;
