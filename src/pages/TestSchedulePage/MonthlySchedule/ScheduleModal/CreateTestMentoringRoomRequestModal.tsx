import { styled } from "@mui/system";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { useState } from "react";
import React from "react";
import { getCookieValue } from "../../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";
import { createTestMentoringRoomRequest } from "../../../../api/createTestMentoringRoomRequest";
import { useLocation } from "react-router";

interface CreateTestMentoringRoomRequestModalProps {
  useIsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const WORK_FIELD_ITEM_LIST = [
  "화공직",
  "환경직",
  "전기직",
  "기계직",
  "직접입력",
];

export const CreateTestMentoringRoomRequestModal = ({
  useIsOpenState,
}: CreateTestMentoringRoomRequestModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useIsOpenState;
  const [selectedWorkFieldItem, setSelectedWorkFieldItem] =
    useState<string>("");
  const [inputWorkFieldItem, setInputWorkFieldItem] = useState<string>("");
  const { hash } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setSelectedWorkFieldItem("");
    setIsOpen(false);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedWorkFieldItem(event.target.value as string);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWorkFieldItem(event.target.value);
  };

  const submitCreateTestMentoringRoomRequestForm = async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    const params = {
      token: accessToken,
      requestWorkField:
        selectedWorkFieldItem === "직접입력"
          ? inputWorkFieldItem
          : selectedWorkFieldItem,
      testScheduleId: Number(hash.substr(1)),
    };

    try {
      const response = await createTestMentoringRoomRequest(params);
      console.log(response);
      enqueueSnackbar(`${params.requestWorkField} 생성신청 완료`, {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${params.requestWorkField} 생성신청 실패`, {
        variant: "error",
      });
    }
  };

  const handleSubmitButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    submitCreateTestMentoringRoomRequestForm();

    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ChildModalContainer>
        <Typography variant="subtitle1" sx={{ fontWeight: "bolder", mb: 2 }}>
          질의응답방 생성신청
        </Typography>
        <Typography variant="subtitle2">
          응시할 직군을 선택해서 신청해주세요
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          목록에 없다면 직접 입력선택후 작성해주세요.
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          질의응답방은 관리자 승인 후 생성됩니다.
        </Typography>
        <FormControl sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">직군선택</InputLabel>
          <Select
            id="demo-simple-select-label"
            label="직군선택"
            value={selectedWorkFieldItem}
            onChange={handleSelectChange}
          >
            {WORK_FIELD_ITEM_LIST.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {Boolean(selectedWorkFieldItem === "직접입력") ? (
          <TextField
            size="small"
            placeholder="응시직군 직접입력"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        ) : null}
        <Button variant="contained" onClick={handleSubmitButton}>
          생성신청
        </Button>
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
