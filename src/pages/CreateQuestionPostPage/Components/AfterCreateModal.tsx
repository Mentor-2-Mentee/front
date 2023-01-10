import { styled } from "@mui/system";
import { Button, Chip, Modal, TextField, Typography } from "@mui/material";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useSnackbar } from "notistack";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

interface AfterCreateModalProps {
  url?: string;
}

export const AfterCreateModal = ({
  url,
}: AfterCreateModalProps): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const copyCreatedQuestionRoomURL = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      enqueueSnackbar("링크 복사 성공!", { variant: "success" });
    } catch (error) {
      console.log("Error :", error);
      enqueueSnackbar("링크 복사 실패. 권한을 확인해주세요.", {
        variant: "error",
      });
    }
  };

  const handleMoveButtonClick = () => {
    if (!url) return;
    window.location.href = url;
  };

  return (
    <>
      <Modal open={Boolean(url)}>
        <ModalContainer>
          <Typography variant="h5">성공적으로 생성되었습니다!</Typography>
          <ClipBoardHandler>
            <TextField value={url} size="small" fullWidth sx={{ mr: 1 }} />
            <Chip
              icon={<ContentPasteIcon />}
              clickable
              onClick={copyCreatedQuestionRoomURL}
              label="Copy"
            />
          </ClipBoardHandler>
          <Button variant="contained" onClick={handleMoveButtonClick}>
            방으로 이동하기
          </Button>
        </ModalContainer>
      </Modal>
    </>
  );
};

const ModalContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4, 4, 5, 4),
  display: "flex",
  flexFlow: "column",

  width: theme.spacing(50),
  height: theme.spacing(15),

  "& > *": {
    marginBottom: theme.spacing(2),
  },
}));

const ClipBoardHandler = styled("div")(({}) => ({
  display: "flex",
  alignItems: "center",
}));
