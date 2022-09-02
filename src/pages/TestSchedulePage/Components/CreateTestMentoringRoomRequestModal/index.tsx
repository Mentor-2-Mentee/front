import { styled } from "@mui/system";
import { Modal } from "@mui/material";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { useState } from "react";
import { useLocation } from "react-router";
import CreateTestMentoringRoomRequestModalHeader from "./Header";
import CreateTestMentoringRoomRequestModalHeaderBodyText from "./BodyText";
import CreateTestMentoringRoomRequestSelectField from "./SelectField";
import CreateTestMentoringRoomRequestSubmitButton from "./SubmitButton";

interface CreateTestMentoringRoomRequestModalProps {
  useIsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const CreateTestMentoringRoomRequestModal = ({
  useIsOpenState,
}: CreateTestMentoringRoomRequestModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useIsOpenState;
  const [testField, setTestField] = useState<string>("");
  const { hash } = useLocation();
  const testScheduleId = Number(hash.substr(1));

  const handleClose = () => {
    setTestField("");
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ChildModalContainer>
        <CreateTestMentoringRoomRequestModalHeader />
        <CreateTestMentoringRoomRequestModalHeaderBodyText />
        <CreateTestMentoringRoomRequestSelectField
          userequestTestFieldState={[testField, setTestField]}
        />
        <CreateTestMentoringRoomRequestSubmitButton
          requestForm={{
            testField,
            testScheduleId,
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

export default CreateTestMentoringRoomRequestModal;
