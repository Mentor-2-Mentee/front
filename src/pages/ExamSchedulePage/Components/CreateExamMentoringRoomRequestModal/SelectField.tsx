import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface CreateExamMentoringRoomRequestSelectFieldProps {
  userequestExamFieldState: [
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

export const CreateExamMentoringRoomRequestSelectField = ({
  userequestExamFieldState,
}: CreateExamMentoringRoomRequestSelectFieldProps): JSX.Element => {
  const [examField, setexamField] = userequestExamFieldState;
  const [selectedexamFieldItem, setSelectedexamFieldItem] =
    useState<string>("");
  const [inputexamFieldItem, setInputexamFieldItem] = useState<string>("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedexamFieldItem(event.target.value as string);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputexamFieldItem(event.target.value);
  };

  useEffect(() => {
    if (selectedexamFieldItem !== "직접입력") {
      setexamField(selectedexamFieldItem);
      return;
    }
    setexamField(inputexamFieldItem);
  }, [selectedexamFieldItem, inputexamFieldItem]);

  return (
    <>
      <FormControl sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">직군선택</InputLabel>
        <Select
          id="demo-simple-select-label"
          label="직군선택"
          value={selectedexamFieldItem}
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
      {Boolean(selectedexamFieldItem === "직접입력") ? (
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

export default CreateExamMentoringRoomRequestSelectField;
