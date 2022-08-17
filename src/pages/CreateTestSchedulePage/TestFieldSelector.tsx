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

interface TestFieldSelectorProps {
  useTestFieldState: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const TestFieldSelector = ({
  useTestFieldState,
}: TestFieldSelectorProps): JSX.Element => {
  const [testField, setTestField] = useTestFieldState;

  const handleSelectTestField = (event: SelectChangeEvent) => {
    setTestField(event.target.value as string);
  };

  return (
    <TestFieldSelectorContainer>
      <FormControl size="small" sx={{ width: 150, mb: 2 }}>
        <InputLabel>시험유형</InputLabel>
        <Select
          value={testField}
          label="시험유형"
          onChange={handleSelectTestField}
        >
          <MenuItem value={"채용"}>채용</MenuItem>
          <MenuItem value={"자격증"}>자격증</MenuItem>
        </Select>
      </FormControl>
    </TestFieldSelectorContainer>
  );
};

const TestFieldSelectorContainer = styled("div")(({ theme }) => ({
  display: "flex",
}));

export default TestFieldSelector;
