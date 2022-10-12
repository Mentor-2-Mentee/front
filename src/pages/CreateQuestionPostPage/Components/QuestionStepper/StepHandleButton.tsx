import { Box, Button } from "@mui/material";

interface StepHandleButtonProps {
  handleNext: () => void;
  handleBack: () => void;
  isDisabledPrevButton: boolean;
  isDisabledNextButton: boolean;
  isLastStep: boolean;
}
export const StepHandleButton = ({
  handleNext,
  handleBack,
  isDisabledNextButton,
  isDisabledPrevButton,
  isLastStep,
}: StepHandleButtonProps) => {
  return (
    <Box sx={{ mb: 2 }}>
      <div>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 1, mr: 1 }}
          disabled={isDisabledNextButton}
        >
          {isLastStep ? "완료" : "다음"}
        </Button>
        <Button
          disabled={isDisabledPrevButton}
          onClick={handleBack}
          sx={{ mt: 1, mr: 1 }}
        >
          이전
        </Button>
      </div>
    </Box>
  );
};

export default StepHandleButton;
