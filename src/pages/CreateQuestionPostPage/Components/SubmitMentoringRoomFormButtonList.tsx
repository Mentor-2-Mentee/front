import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useNavigate } from "react-router";

interface SubmitMentoringRoomFormButtonListProps {
  debouncedCreateQuestionRoom: () => void;
}

export const SubmitMentoringRoomFormButtonList = ({
  debouncedCreateQuestionRoom,
}: SubmitMentoringRoomFormButtonListProps): JSX.Element => {
  const navigation = useNavigate();

  const handleCancelButton = () => navigation(-1);

  return (
    <ButtonContainer>
      <Button
        variant="contained"
        sx={{
          background: SignatureColor.GRAY,
          color: SignatureColor.BLACK,
          "&:hover": {
            background: SignatureColor.RED,
            color: SignatureColor.WHITE,
          },
        }}
        onClick={handleCancelButton}
      >
        취소
      </Button>
      <Button variant="contained" onClick={debouncedCreateQuestionRoom}>
        등록하기
      </Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row",
  justifyContent: "end",
  marginTop: theme.spacing(2),

  "& > button": {
    marginLeft: theme.spacing(2),
  },
}));

export default SubmitMentoringRoomFormButtonList;
