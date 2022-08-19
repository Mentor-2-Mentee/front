import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useNavigate } from "react-router-dom";
import { CreateTestSchedulePageMode } from "..";
import { SubmitTestScheduleFormConfig } from "../utils";

interface SubmitTestScheduleButtonListProps {
  useModeState: [
    CreateTestSchedulePageMode,
    React.Dispatch<React.SetStateAction<CreateTestSchedulePageMode>>
  ];
  debouncedSubmitTestScheduleForm: () => void;
}

enum SubmitTestScheduleButtonTag {
  CREATE = "등록하기",
  UPDATE = "수정하기",
}

export const SubmitTestScheduleButtonList = ({
  useModeState,
  debouncedSubmitTestScheduleForm,
}: SubmitTestScheduleButtonListProps): JSX.Element => {
  const [mode, setMode] = useModeState;
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
      <Button
        variant="contained"
        onClick={() => {
          debouncedSubmitTestScheduleForm();
        }}
      >
        {SubmitTestScheduleButtonTag[mode]}
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

export default SubmitTestScheduleButtonList;
