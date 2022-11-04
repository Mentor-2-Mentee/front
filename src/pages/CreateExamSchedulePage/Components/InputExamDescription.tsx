import { TextField } from "@mui/material";

interface InputExamDescriptionProps {
  useDescriptionState: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const InputExamDescription = ({
  useDescriptionState,
}: InputExamDescriptionProps): JSX.Element => {
  const [description, setDescription] = useDescriptionState;

  const handleInputExamDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setDescription(event.target.value);
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
      value={description}
      onChange={handleInputExamDescription}
    />
  );
};

export default InputExamDescription;
