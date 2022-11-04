import { TextField } from "@mui/material";

interface InputExamScheduleTitleProps {
  useOrganizerState: [string, React.Dispatch<React.SetStateAction<string>>];
}
export const InputExamScheduleTitle = ({
  useOrganizerState,
}: InputExamScheduleTitleProps): JSX.Element => {
  const [organizer, setOrganizer] = useOrganizerState;

  const handleInputExamScheduleTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setOrganizer(event.target.value);

  return (
    <TextField
      variant="outlined"
      name="title"
      size="small"
      placeholder="시험이름을 입력해 주세요"
      fullWidth
      value={organizer}
      onChange={handleInputExamScheduleTitle}
      sx={{ mb: 2 }}
    />
  );
};

export default InputExamScheduleTitle;
