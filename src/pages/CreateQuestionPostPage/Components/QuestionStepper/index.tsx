import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  SxProps,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  QuestionPostForm,
  UploadType,
} from "../../../../hooks/queries/questionPost";
import QuestionStepContents from "./QuestionStepContents";
import StepHandleButton from "./StepHandleButton";

const STEPS = [
  {
    label: "문제 유형 선택",
    description: `문제 유형을 선택해주세요.\n해당하는 태그가 없다면 기타를 선택해주세요`,
  },
  {
    label: "등록 방법 선택",
    description: "문제를 등록할 방법을 선택해주세요.",
  },
  {
    label: "문제 등록",
    description: `문제를 작성해주세요`,
  },
  {
    label: "게시글 작성",
    description: `게시글 제목과 질의 내용을 적어주세요.\n상세히 적을수록 좋은 답변을 받을 수 있습니다.`,
  },
];

interface QuestionStepperProps {
  useActiveStepState: [number, React.Dispatch<React.SetStateAction<number>>];
  useIsStepFinishState: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
  useQuestionPostFormState: [
    QuestionPostForm,
    React.Dispatch<React.SetStateAction<QuestionPostForm>>
  ];
}

type StepResult = {
  [key: number]: string | undefined;
};

const initialStepResult = (): StepResult => {
  const baseObject: StepResult = {};
  const indexArray: Array<number> = [...Array(STEPS.length).keys()];
  indexArray.map((index) => {
    baseObject[index] = undefined;
  });
  return baseObject;
};

export const QuestionStepper = ({
  useActiveStepState,
  useIsStepFinishState,
  useQuestionPostFormState,
}: QuestionStepperProps) => {
  const [activeStep, setActiveStep] = useActiveStepState;
  const [isStepFinish, setIsStepFinish] = useIsStepFinishState;
  const [questionPostForm, setQuestionPostForm] = useQuestionPostFormState;
  const [stepResult, setStepResult] = useState<StepResult>(initialStepResult());
  const navigation = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const checkButtonDisable = useCallback(
    (stepLabel: string) => {
      if (
        stepLabel === "문제 유형 선택" &&
        questionPostForm.questionForm.rootTag === undefined
      )
        return true;
      if (
        stepLabel === "등록 방법 선택" &&
        questionPostForm.uploadType === undefined
      )
        return true;

      if (
        stepLabel === "문제 등록" &&
        questionPostForm.questionForm.questionType === undefined
      )
        return true;

      return false;
    },
    [questionPostForm]
  );

  useEffect(() => {
    if (questionPostForm.questionForm.rootTag) {
      if (questionPostForm.questionForm.detailTag.length !== 0) {
        const childTagString =
          questionPostForm.questionForm.detailTag.join(", ");
        setStepResult({
          ...stepResult,
          [0]: `${questionPostForm.questionForm.rootTag} > ${childTagString}`,
        });
      } else {
        setStepResult({
          ...stepResult,
          [0]: `${questionPostForm.questionForm.rootTag}`,
        });
      }
    }
  }, [
    questionPostForm.questionForm.rootTag,
    questionPostForm.questionForm.detailTag,
  ]);

  useEffect(() => {
    if (questionPostForm.uploadType) {
      setStepResult({
        ...stepResult,
        [1]: UploadType[questionPostForm.uploadType],
      });
    }
  }, [questionPostForm.uploadType]);

  useEffect(() => {
    if (questionPostForm.questionForm.questionType) {
      setStepResult({
        ...stepResult,
        [2]: questionPostForm.questionForm.questionType,
      });
    }
  }, [questionPostForm.questionForm.questionType]);

  useEffect(() => {
    if (activeStep === STEPS.length) {
      setIsStepFinish(true);
    } else {
      setIsStepFinish(false);
    }
  }, [activeStep]);

  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {STEPS.map((step, index) => {
          const stepLabel = `${step.label} ${
            stepResult[index] === undefined ? "" : ": " + stepResult[index]
          }`;
          return (
            <Step key={step.label}>
              <StepLabel>{stepLabel}</StepLabel>
              <StepContent>
                <Typography sx={DescriptionSxProps}>
                  {step.description}
                </Typography>
                <QuestionStepContents
                  stepIndex={index}
                  useQuestionPostFormState={useQuestionPostFormState}
                />

                <StepHandleButton
                  handleNext={handleNext}
                  handleBack={handleBack}
                  isDisabledPrevButton={index === 0}
                  isDisabledNextButton={checkButtonDisable(step.label)}
                  isLastStep={index === STEPS.length - 1}
                />
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
      <FinishButton
        handleBack={handleBack}
        isFinish={activeStep === STEPS.length}
      />
    </>
  );
};

interface FinishButtonProps {
  isFinish: boolean;
  handleBack: () => void;
}

const FinishButton = ({ isFinish, handleBack }: FinishButtonProps) => {
  if (!isFinish) return <div>{null}</div>;

  return (
    <Paper square elevation={0} sx={{ p: 3 }}>
      <Typography sx={DescriptionSxProps}>
        {`등록과정 완료!\n아래의 등록버튼을 눌러주세요!`}
      </Typography>
      <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
        이전단계로 돌아가기
      </Button>
    </Paper>
  );
};

const DescriptionSxProps: SxProps = {
  whiteSpace: "pre-wrap",
  mb: 1,
};

export default QuestionStepper;
