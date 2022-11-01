import {
  Box,
  Button,
  Container,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useCallback } from "react";
import { useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";

import { useSnackbar } from "notistack";

import { AfterCreateModal } from "./Components";
import { getCookieValue } from "../../utils/handleCookieValue";
import { useNavigate } from "react-router";
import QuestionStepper from "./Components/QuestionStepper";
import { QuestionPostForm } from "../../hooks/queries/questionPost";
import { usePostQuestionPostMutation } from "../../hooks/queries/questionPost/usePostQuestionPostMutation";

export const CreateQuestionPostPage = (): JSX.Element => {
  const [createdURL, setCreatedURL] = useState<string>();

  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isWidthShort = useMediaQuery("(max-width:900px)");

  const [questionPostForm, setQuestionPostForm] = useState<QuestionPostForm>({
    uploadType: undefined,
    questionForm: {
      rootTag: undefined,
      detailTag: [],
      questionText: undefined,
    },
    title: undefined,
    description: undefined,
  });

  const postQuestionMutation = usePostQuestionPostMutation(
    enqueueSnackbar,
    navigation
  );

  const handleSubmitButton = useCallback(() => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    postQuestionMutation.mutate({
      token,
      questionPostForm,
    });
  }, [questionPostForm]);

  const handleCancelButton = () => navigation(-1);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isStepFinish, setIsStepFinish] = useState<boolean>(false);

  return (
    <Container sx={PageContainerSxProps(isWidthShort)}>
      <Box sx={PageInnerBoxSxProps(isWidthShort)}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          문제등록
        </Typography>

        <QuestionStepper
          useActiveStepState={[activeStep, setActiveStep]}
          useIsStepFinishState={[isStepFinish, setIsStepFinish]}
          useQuestionPostFormState={[questionPostForm, setQuestionPostForm]}
        />

        <Box
          sx={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "end",
            marginTop: 2,

            "& > button": {
              marginLeft: 2,
            },
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: SignatureColor.GRAY,
              color: SignatureColor.BLACK,
              "&:hover": {
                background: SignatureColor.RED,
                color: SignatureColor.WHITE,
              },
            }}
            onClick={handleCancelButton}
          >
            취소
          </Button>
          <Button
            variant="contained"
            disabled={!isStepFinish}
            onClick={handleSubmitButton}
          >
            등록
          </Button>
        </Box>

        <AfterCreateModal url={createdURL} />
      </Box>
    </Container>
  );
};

const PageContainerSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    background: SignatureColor.GRAY,
    padding: isWidthShort ? theme.spacing(2) : theme.spacing(4),
    minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(10)})`,
  });

const PageInnerBoxSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    padding: isWidthShort ? theme.spacing(2) : theme.spacing(6),
    background: SignatureColor.WHITE,
    borderRadius: theme.spacing(3),
    minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(14)})`,
  });

export default CreateQuestionPostPage;
