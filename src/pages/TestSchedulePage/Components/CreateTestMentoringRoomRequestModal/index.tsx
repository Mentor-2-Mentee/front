import { styled } from "@mui/system";
import { Modal } from "@mui/material";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { useState } from "react";
import { useLocation } from "react-router";
import CreateTestMentoringRoomRequestModalHeader from "./CreateTestMentoringRoomRequestModalHeader";
import CreateTestMentoringRoomRequestModalHeaderBodyText from "./CreateTestMentoringRoomRequestModalHeaderBodyText";
import CreateTestMentoringRoomRequestSelectField from "./CreateTestMentoringRoomRequestSelectField";
import CreateTestMentoringRoomRequestSubmitButton from "./CreateTestMentoringRoomRequestSubmitButton";

interface CreateTestMentoringRoomRequestModalProps {
  useIsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const CreateTestMentoringRoomRequestModal = ({
  useIsOpenState,
}: CreateTestMentoringRoomRequestModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useIsOpenState;
  const [requestWorkField, setRequestWorkField] = useState<string>("");
  const { hash } = useLocation();
  const testScheduleId = Number(hash.substr(1));

  const handleClose = () => {
    setRequestWorkField("");
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ChildModalContainer>
        <CreateTestMentoringRoomRequestModalHeader />
        <CreateTestMentoringRoomRequestModalHeaderBodyText />
        <CreateTestMentoringRoomRequestSelectField
          useRequestWorkFieldState={[requestWorkField, setRequestWorkField]}
        />
        <CreateTestMentoringRoomRequestSubmitButton
          requestForm={{
            requestWorkField,
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
