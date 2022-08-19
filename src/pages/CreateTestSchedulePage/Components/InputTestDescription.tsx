import { TextField } from "@mui/material";

interface InputTestDescriptionProps {
  useTestDescriptionState: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

export const InputTestDescription = ({
  useTestDescriptionState,
}: InputTestDescriptionProps): JSX.Element => {
  const [testDescription, setTestDescription] = useTestDescriptionState;

  const handleInputTestDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setTestDescription(event.target.value);
  return (
    <TextField
      variant="outlined"
      name="title"
      size="small"
      placeholder="시험에 대한 설명을 간략히 적어주세요"
      rows={4}
      multiline
      fullWidth
      sx={{ mb: 2 }}
      value={testDescription}
      onChange={handleInputTestDescription}
    />
  );
};

export default InputTestDescription;
