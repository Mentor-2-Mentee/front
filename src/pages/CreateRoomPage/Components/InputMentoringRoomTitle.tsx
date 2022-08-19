import { TextField } from "@mui/material";

interface InputMentoringRoomTitleProps {
  useMentoringRoomTitleState: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
}
export const InputMentoringRoomTitle = ({
  useMentoringRoomTitleState,
}: InputMentoringRoomTitleProps): JSX.Element => {
  const [mentoringRoomTitle, setMentoringRoomTitle] =
    useMentoringRoomTitleState;
  const handleInputMentoringRoomTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setMentoringRoomTitle(event.target.value);

  return (
    <TextField
      variant="outlined"
      name="title"
      size="small"
      placeholder="제목을 입력해 주세요"
      fullWidth
      value={mentoringRoomTitle}
      onChange={handleInputMentoringRoomTitle}
    />
  );
};
