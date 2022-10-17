import { styled } from "@mui/system";
import { Modal } from "@mui/material";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { useState } from "react";
import { useLocation } from "react-router";
import CreateExamReviewRoomRequestModalHeader from "./Header";
import CreateExamReviewRoomRequestModalHeaderBodyText from "./BodyText";
import CreateExamReviewRoomRequestSelectField from "./SelectField";
import CreateExamReviewRoomRequestSubmitButton from "./SubmitButton";

interface CreateExamReviewRoomRequestModalProps {
  useIsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const CreateExamReviewRoomRequestModal = ({
  useIsOpenState,
}: CreateExamReviewRoomRequestModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useIsOpenState;
  const [examType, setExamType] = useState<string>("");
  const { hash } = useLocation();
  const examScheduleId = Number(hash.substr(1));

  const handleClose = () => {
    setExamType("");
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ChildModalContainer>
        <CreateExamReviewRoomRequestModalHeader />
        <CreateExamReviewRoomRequestModalHeaderBodyText />
        <CreateExamReviewRoomRequestSelectField
          useExamTypeState={[examType, setExamType]}
        />
        <CreateExamReviewRoomRequestSubmitButton
          requestForm={{
            examType,
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

export default CreateExamReviewRoomRequestModal;
