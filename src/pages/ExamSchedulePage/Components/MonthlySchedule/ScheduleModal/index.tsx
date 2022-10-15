import { styled } from "@mui/system";
import { Button, Fab, Modal, Typography } from "@mui/material";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { ExamSchedule } from "../../../../../hooks/queries/examSchedule";
import { useContext, useState } from "react";
import { RootContext } from "../../../../../hooks/context/RootContext";
import { useNavigate } from "react-router-dom";
import AdminButton from "./AdminButton";
import ExamScheduleImageList from "./ExamScheduleImageList";
import ExamReviewRoomList from "./ExamReviewRoomList";
import ExamScheduleInfo from "./ExamScheduleInfo";
import CreateExamReviewRoomRequestList from "./CreateExamReviewRoomRequestList";
import CreateExamReviewRoomRequestModal from "../../CreateExamReviewRoomRequestModal";
import CloseIcon from "@mui/icons-material/Close";

interface ScheduleModalProps {
  useIsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  examSchedule: ExamSchedule;
}

export const ScheduleModal = ({
  useIsOpenState,
  examSchedule,
}: ScheduleModalProps): JSX.Element => {
  const { userGrade } = useContext(RootContext);
  const [scheduleModalOpen, setScheduleModalOpen] = useIsOpenState;
  const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);
  const navigation = useNavigate();

  const handleScheduleModalClose = () => {
    navigation("/exam-schedule");
    setScheduleModalOpen(false);
  };

  const handleRequestModalOpen = () => setRequestModalOpen(true);

  return (
    <Modal
      open={scheduleModalOpen}
      onClose={handleScheduleModalClose}
      sx={{
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ModalContainer>
        <Fab
          color="default"
          sx={{
            position: "absolute",
            top: -65,
            left: "50%",
            transform: "translate(-50%,0%)",
          }}
          onClick={handleScheduleModalClose}
        >
          <CloseIcon />
        </Fab>
        <AdminButton userGrade={userGrade} examSchedule={examSchedule} />
        <ExamScheduleInfo examSchedule={examSchedule} />

        <ExamReviewRoomListContainer>
          <ExamReviewRoomListHeader>
            <Typography variant="subtitle1" sx={{ fontWeight: "bolder" }}>
              시험리뷰방
            </Typography>
            <Button
              size="small"
              variant="text"
              onClick={handleRequestModalOpen}
            >
              시험리뷰방 생성신청
            </Button>
            <CreateExamReviewRoomRequestModal
              useIsOpenState={[requestModalOpen, setRequestModalOpen]}
            />
          </ExamReviewRoomListHeader>
          {/* <ExamReviewRoomList /> */}
          <CreateExamReviewRoomRequestList
            examScheduleTitle={examSchedule.organizer}
          />
        </ExamReviewRoomListContainer>

        <ExamScheduleImageList imageUrlList={examSchedule.imageUrl} />
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(10),
  left: "50%",
  transform: "translate(-50%, 0%)",
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4, 4, 5, 4),
  marginBottom: theme.spacing(20),
  display: "flex",
  flexFlow: "column",

  width: theme.spacing(40),

  "& > *": {
    marginBottom: theme.spacing(2),
  },
}));

const ExamReviewRoomListContainer = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,

  boxSizing: "border-box",
}));
const ExamReviewRoomListHeader = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1, 1, 1, 2),
  justifyContent: "space-between",
  alignItems: "center",
}));

export default ScheduleModal;
