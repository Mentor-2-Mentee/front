import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/system";

interface ExamFieldSelectorProps {
  useScheduleTypeState: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const ExamFieldSelector = ({
  useScheduleTypeState,
}: ExamFieldSelectorProps): JSX.Element => {
  const [scheduleType, setScheduleType] = useScheduleTypeState;

  const handleSelectExamField = (event: SelectChangeEvent) => {
    setScheduleType(event.target.value as string);
  };

  return (
    <ExamFieldSelectorContainer>
      <FormControl size="small" sx={{ width: 150, mb: 2 }}>
        <InputLabel>시험유형</InputLabel>
        <Select
          value={scheduleType}
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

const ExamFieldSelectorContainer = styled("div")(({}) => ({
  display: "flex",
}));

export default ExamFieldSelector;
