import { TextField } from "@mui/material";

interface InputExamScheduleTitleProps {
  useExamScheduleTitleState: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
}
export const InputExamScheduleTitle = ({
  useExamScheduleTitleState,
}: InputExamScheduleTitleProps): JSX.Element => {
  const [examScheduleTitle, setExamScheduleTitle] = useExamScheduleTitleState;

  const handleInputExamScheduleTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setExamScheduleTitle(event.target.value);

  return (
    <TextField
      variant="outlined"
      name="title"
      size="small"
      placeholder="시험이름을 입력해 주세요"
      fullWidth
      value={examScheduleTitle}
      onChange={handleInputExamScheduleTitle}
      sx={{ mb: 2 }}
    />
  );
};

export default InputExamScheduleTitle;
