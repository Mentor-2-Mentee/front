import { styled } from "@mui/system";
import { Button, Modal, Typography } from "@mui/material";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { ExamSchedule } from "../../../../../hooks/queries/examSchedule";
import { useContext, useState } from "react";
import { RootContext } from "../../../../../hooks/context/RootContext";
import { useNavigate } from "react-router-dom";
import AdminButton from "./AdminButton";
import ExamScheduleImageList from "./ExamScheduleImageList";
import ExamMentoringRoomList from "./ExamMentoringRoomList";
import ExamScheduleInfo from "./ExamScheduleInfo";
import CreateExamMentoringRoomRequestList from "./CreateExamMentoringRoomRequestList";
import CreateExamMentoringRoomRequestModal from "../../CreateExamMentoringRoomRequestModal";

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
        <AdminButton userGrade={userGrade} examSchedule={examSchedule} />
        <ExamScheduleInfo examSchedule={examSchedule} />

        <ExamMentoringRoomListContainer>
          <ExamMentoringRoomListHeader>
            <Typography variant="subtitle1" sx={{ fontWeight: "bolder" }}>
              시험관련 질의응답방
            </Typography>
            <Button
              size="small"
              variant="text"
              onClick={handleRequestModalOpen}
            >
              질의응답방 생성신청
            </Button>
            <CreateExamMentoringRoomRequestModal
              useIsOpenState={[requestModalOpen, setRequestModalOpen]}
            />
          </ExamMentoringRoomListHeader>
          <ExamMentoringRoomList />
          <CreateExamMentoringRoomRequestList />
        </ExamMentoringRoomListContainer>

        <ExamScheduleImageList imageUrlList={examSchedule.imageFiles} />
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

const ExamMentoringRoomListContainer = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,

  boxSizing: "border-box",
}));
const ExamMentoringRoomListHeader = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1, 1, 1, 2),
  justifyContent: "space-between",
  alignItems: "center",
}));

export default ScheduleModal;
