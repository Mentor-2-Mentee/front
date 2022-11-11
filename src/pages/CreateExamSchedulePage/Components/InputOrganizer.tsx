import { TextField } from "@mui/material";

interface InputExamScheduleTitleProps {
  useOrganizerState: [string, React.Dispatch<React.SetStateAction<string>>];
}
export const InputOrganizer = ({
  useOrganizerState,
}: InputExamScheduleTitleProps): JSX.Element => {
  const [organizer, setOrganizer] = useOrganizerState;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOrganizer(event.target.value);

  return (
    <TextField
      variant="outlined"
      name="title"
      size="small"
      placeholder="시험이름을 입력해 주세요"
      fullWidth
      helperText={organizer.length > 20 ? "20자 이하만 가능합니다" : null}
      error={organizer.length > 20}
      value={organizer}
      onChange={handleInputChange}
      sx={{ mb: 2 }}
    />
  );
};

export default InputOrganizer;
