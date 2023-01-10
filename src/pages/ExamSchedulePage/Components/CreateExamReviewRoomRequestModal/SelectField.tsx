import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface SelectFieldProps {
  useExamTypeState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const DEFAULT_EXAM_TYPE = ["화공직", "환경직", "전기직", "기계직", "직접입력"];

export const SelectField = ({
  useExamTypeState,
}: SelectFieldProps): JSX.Element => {
  const [examType, setExamType] = useExamTypeState;
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
      setExamType(selectedexamFieldItem);
      return;
    }
    setExamType(inputexamFieldItem);
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
          {DEFAULT_EXAM_TYPE.map((examType) => {
            return (
              <MenuItem key={examType} value={examType}>
                {examType}
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

export default SelectField;
