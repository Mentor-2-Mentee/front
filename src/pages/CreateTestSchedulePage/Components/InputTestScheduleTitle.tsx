import { TextField } from "@mui/material";

interface InputTestScheduleTitleProps {
  useTestScheduleTitleState: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
}
export const InputTestScheduleTitle = ({
  useTestScheduleTitleState,
}: InputTestScheduleTitleProps): JSX.Element => {
  const [testScheduleTitle, setTestScheduleTitle] = useTestScheduleTitleState;

  const handleInputTestScheduleTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setTestScheduleTitle(event.target.value);

  return (
    <TextField
      variant="outlined"
      name="title"
      size="small"
      placeholder="시험이름을 입력해 주세요"
      fullWidth
      value={testScheduleTitle}
      onChange={handleInputTestScheduleTitle}
      sx={{ mb: 2 }}
    />
  );
};

export default InputTestScheduleTitle;
