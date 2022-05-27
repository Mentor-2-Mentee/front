import { Fab } from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import { SignatureColor } from "../../commonStyles/CommonColor";

export const FloatingButton = (): JSX.Element => {
  return (
    <FloatingButtonContainer>
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

export default FloatingButton;
