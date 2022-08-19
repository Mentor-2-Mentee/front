import { TextField } from "@mui/material";

interface InputTestUrlProps {
  useTestUrlState: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const InputTestUrl = ({
  useTestUrlState,
}: InputTestUrlProps): JSX.Element => {
  const [testUrl, setTestUrl] = useTestUrlState;

  const handleInputTestUrl = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTestUrl(event.target.value);

  return (
    <TextField
      variant="outlined"
      name="title"
      size="small"
      placeholder="공고 링크 (ex - https://www.q-net.or.kr)"
      fullWidth
      value={testUrl}
      onChange={handleInputTestUrl}
      sx={{ mb: 2 }}
    />
  );
};

export default InputTestUrl;
