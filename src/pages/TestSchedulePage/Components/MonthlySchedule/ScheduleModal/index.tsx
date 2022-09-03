import { styled } from "@mui/system";
import { Button, Modal, Typography } from "@mui/material";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { TestSchedule } from "../../../../../hooks/queries/testSchedule";
import { useContext, useState } from "react";
import { RootContext } from "../../../../../hooks/context/RootContext";
import { useNavigate } from "react-router-dom";
import AdminButton from "./AdminButton";
import TestScheduleImageList from "./TestScheduleImageList";
import TestMentoringRoomList from "./TestMentoringRoomList";
import TestScheduleInfo from "./TestScheduleInfo";
import CreateTestMentoringRoomRequestList from "./CreateTestMentoringRoomRequestList";
import CreateTestMentoringRoomRequestModal from "../../CreateTestMentoringRoomRequestModal";

interface ScheduleModalProps {
  useIsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  testSchedule: TestSchedule;
}

export const ScheduleModal = ({
  useIsOpenState,
  testSchedule,
}: ScheduleModalProps): JSX.Element => {
  const { userGrade } = useContext(RootContext);
  const [scheduleModalOpen, setScheduleModalOpen] = useIsOpenState;
  const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);
  const navigation = useNavigate();

  const handleScheduleModalClose = () => {
    navigation("/test-schedule");
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
        <AdminButton userGrade={userGrade} testSchedule={testSchedule} />
        <TestScheduleInfo testSchedule={testSchedule} />

        <TestMentoringRoomListContainer>
          <TestMentoringRoomListHeader>
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
            <CreateTestMentoringRoomRequestModal
              useIsOpenState={[requestModalOpen, setRequestModalOpen]}
            />
          </TestMentoringRoomListHeader>
          <TestMentoringRoomList />
          <CreateTestMentoringRoomRequestList />
        </TestMentoringRoomListContainer>

        <TestScheduleImageList imageUrlList={testSchedule.imageFiles} />
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

  width: theme.spacing(50),

  "& > *": {
    marginBottom: theme.spacing(2),
  },
}));

const TestMentoringRoomListContainer = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,

  boxSizing: "border-box",
}));
const TestMentoringRoomListHeader = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1, 1, 1, 2),
  justifyContent: "space-between",
  alignItems: "center",
}));

export default ScheduleModal;