import { Fab } from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import { SignatureColor } from "../commonStyles/CommonColor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RootContext } from "../hooks/context/RootContext";
import { useSnackbar } from "notistack";

export const NewQuestionButton = (): JSX.Element => {
  const { id } = useContext(RootContext);
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const moveCreateRoomPage = () => {
    // if (!id) {
    //   enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
    //   return;
    // }
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

const FloatingButtonContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 50,
  right: 50,
}));

export default NewQuestionButton;
