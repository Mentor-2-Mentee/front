import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";

interface ExamFieldSelectorProps {
  useExamFieldState: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const ExamFieldSelector = ({
  useExamFieldState,
}: ExamFieldSelectorProps): JSX.Element => {
  const [examType, setExamField] = useExamFieldState;

  const handleSelectExamField = (event: SelectChangeEvent) => {
    setExamField(event.target.value as string);
  };

  return (
    <ExamFieldSelectorContainer>
      <FormControl size="small" sx={{ width: 150, mb: 2 }}>
        <InputLabel>시험유형</InputLabel>
        <Select
          value={examType}
          label="시험유형"
          onChange={handleSelectExamField}
        >
          <MenuItem value={"채용"}>채용</MenuItem>
          <MenuItem value={"자격증"}>자격증</MenuItem>
        </Select>
      </FormControl>
    </ExamFieldSelectorContainer>
  );
};

const ExamFieldSelectorContainer = styled("div")(({ theme }) => ({
  display: "flex",
}));

export default ExamFieldSelector;
