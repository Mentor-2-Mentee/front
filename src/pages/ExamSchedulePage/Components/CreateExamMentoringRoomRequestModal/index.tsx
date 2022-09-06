import { styled } from "@mui/system";
import { Modal } from "@mui/material";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { useState } from "react";
import { useLocation } from "react-router";
import CreateExamMentoringRoomRequestModalHeader from "./Header";
import CreateExamMentoringRoomRequestModalHeaderBodyText from "./BodyText";
import CreateExamMentoringRoomRequestSelectField from "./SelectField";
import CreateExamMentoringRoomRequestSubmitButton from "./SubmitButton";

interface CreateExamMentoringRoomRequestModalProps {
  useIsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const CreateExamMentoringRoomRequestModal = ({
  useIsOpenState,
}: CreateExamMentoringRoomRequestModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useIsOpenState;
  const [examField, setExamField] = useState<string>("");
  const { hash } = useLocation();
  const examScheduleId = Number(hash.substr(1));

  const handleClose = () => {
    setExamField("");
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ChildModalContainer>
        <CreateExamMentoringRoomRequestModalHeader />
        <CreateExamMentoringRoomRequestModalHeaderBodyText />
        <CreateExamMentoringRoomRequestSelectField
          userequestExamFieldState={[examField, setExamField]}
        />
        <CreateExamMentoringRoomRequestSubmitButton
          requestForm={{
            examField,
            examScheduleId,
          }}
          useIsOpenState={useIsOpenState}
        />
      </ChildModalContainer>
    </Modal>
  );
};

const ChildModalContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4, 4, 5, 4),
  marginBottom: theme.spacing(20),
  display: "flex",
  flexFlow: "column",

  width: theme.spacing(40),
}));

export default CreateExamMentoringRoomRequestModal;
