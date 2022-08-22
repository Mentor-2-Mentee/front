import { styled } from "@mui/system";
import { Box, Button, Link, Modal, Typography } from "@mui/material";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { TestSchedule } from "../../../../hooks/queries/testSchedule";
import { useContext, useEffect } from "react";
import { RootContext } from "../../../../hooks/context/RootContext";
import { useLocation, useNavigate } from "react-router";
import { urlChecker } from "../../../../utils/urlChecker";
import AdminButton from "./AdminButton";
import TestScheduleImageList from "./TestScheduleImageList";
import TestMentoringRoomList from "./TestMentoringRoomList";
import TestScheduleInfo from "./TestScheduleInfo";

interface ScheduleModalProps {
  useIsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  testSchedule: TestSchedule;
}

export const ScheduleModal = ({
  useIsOpenState,
  testSchedule,
}: ScheduleModalProps): JSX.Element => {
  const { userGrade } = useContext(RootContext);
  const { hash } = useLocation();
  const [isOpen, setIsOpen] = useIsOpenState;
  const navigation = useNavigate();

  const handleClose = () => {
    navigation("/test-schedule");
    setIsOpen(false);
  };

  useEffect(() => {
    if (hash === `#${testSchedule.testScheduleId}`) {
      setIsOpen(true);
    }
  }, []);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
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
        <TestMentoringRoomList />
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

export default ScheduleModal;
