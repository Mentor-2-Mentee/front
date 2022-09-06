import { TextField } from "@mui/material";

interface InputExamUrlProps {
  useExamUrlState: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const InputExamUrl = ({
  useExamUrlState,
}: InputExamUrlProps): JSX.Element => {
  const [examUrl, setExamUrl] = useExamUrlState;

  const handleInputExamUrl = (event: React.ChangeEvent<HTMLInputElement>) =>
    setExamUrl(event.target.value);

  return (
    <TextField
      variant="outlined"
      name="title"
      size="small"
      placeholder="공고 링크 (ex - https://www.q-net.or.kr)"
      fullWidth
      value={examUrl}
      onChange={handleInputExamUrl}
      sx={{ mb: 2 }}
    />
  );
};

export default InputExamUrl;
