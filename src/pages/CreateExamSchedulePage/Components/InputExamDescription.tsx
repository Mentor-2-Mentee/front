import { TextField } from "@mui/material";

interface InputExamDescriptionProps {
  useExamDescriptionState: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

export const InputExamDescription = ({
  useExamDescriptionState,
}: InputExamDescriptionProps): JSX.Element => {
  const [examDescription, setExamDescription] = useExamDescriptionState;

  const handleInputExamDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setExamDescription(event.target.value);
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
      value={examDescription}
      onChange={handleInputExamDescription}
    />
  );
};

export default InputExamDescription;
