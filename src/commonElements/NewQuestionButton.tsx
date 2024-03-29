import { Fab } from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import { SignatureColor } from "../commonStyles/CommonColor";
import { useNavigate } from "react-router-dom";

export const NewQuestionButton = (): JSX.Element => {
  const navigation = useNavigate();

  const moveCreateRoomPage = () => {
    navigation("/new-question");
  };

  return (
    <FloatingButtonContainer onClick={moveCreateRoomPage}>
      <Fab
        color="primary"
        aria-label="edit"
        sx={{ backgroundColor: SignatureColor.BLUE }}
      >
        <EditIcon />
      </Fab>
    </FloatingButtonContainer>
  );
};

const FloatingButtonContainer = styled("div")(({}) => ({
  position: "fixed",
  bottom: 50,
  right: 50,
}));

export default NewQuestionButton;
