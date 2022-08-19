import { TextField } from "@mui/material";

interface InputMentoringRoomDescriptionProps {
  useMentoringRoomDescriptionState: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
}
export const InputMentoringRoomDescription = ({
  useMentoringRoomDescriptionState,
}: InputMentoringRoomDescriptionProps): JSX.Element => {
  const [mentoringRoomDescription, setMentoringRoomDescription] =
    useMentoringRoomDescriptionState;
  const handleInputMentoringRoomDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setMentoringRoomDescription(event.target.value);
  return (
    <TextField
      variant="outlined"
      name="title"
      size="small"
      placeholder="질문에 대한 설명을 간략히 적어주세요"
      rows={4}
      multiline
      fullWidth
      sx={{ mb: 2 }}
      value={mentoringRoomDescription}
      onChange={handleInputMentoringRoomDescription}
    />
  );
};
