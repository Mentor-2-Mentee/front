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
  userequestTestFieldState: [
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
  userequestTestFieldState,
}: CreateTestMentoringRoomRequestSelectFieldProps): JSX.Element => {
  const [testField, settestField] = userequestTestFieldState;
  const [selectedtestFieldItem, setSelectedtestFieldItem] =
    useState<string>("");
  const [inputtestFieldItem, setInputtestFieldItem] = useState<string>("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedtestFieldItem(event.target.value as string);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputtestFieldItem(event.target.value);
  };

  useEffect(() => {
    if (selectedtestFieldItem !== "직접입력") {
      settestField(selectedtestFieldItem);
      return;
    }
    settestField(inputtestFieldItem);
  }, [selectedtestFieldItem, inputtestFieldItem]);

  return (
    <>
      <FormControl sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">직군선택</InputLabel>
        <Select
          id="demo-simple-select-label"
          label="직군선택"
          value={selectedtestFieldItem}
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
      {Boolean(selectedtestFieldItem === "직접입력") ? (
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
