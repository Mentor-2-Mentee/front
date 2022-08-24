import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface CreateTestMentoringRoomRequestSelectFieldProps {
  useRequestWorkFieldState: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

const WORK_FIELD_ITEM_LIST = [
  "화공직",
  "환경직",
  "전기직",
  "기계직",
  "직접입력",
];

export const CreateTestMentoringRoomRequestSelectField = ({
  useRequestWorkFieldState,
}: CreateTestMentoringRoomRequestSelectFieldProps): JSX.Element => {
  const [workField, setWorkField] = useRequestWorkFieldState;
  const [selectedWorkFieldItem, setSelectedWorkFieldItem] =
    useState<string>("");
  const [inputWorkFieldItem, setInputWorkFieldItem] = useState<string>("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedWorkFieldItem(event.target.value as string);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWorkFieldItem(event.target.value);
  };

  useEffect(() => {
    if (selectedWorkFieldItem !== "직접입력") {
      setWorkField(selectedWorkFieldItem);
      return;
    }
    setWorkField(inputWorkFieldItem);
  }, [selectedWorkFieldItem, inputWorkFieldItem]);

  return (
    <>
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
    </>
  );
};

export default CreateTestMentoringRoomRequestSelectField;
