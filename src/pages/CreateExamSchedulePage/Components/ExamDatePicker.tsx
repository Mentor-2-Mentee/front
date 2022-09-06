import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import DateFormatting from "../../../utils/dateFormatting";

interface ExamDatePickerProps {
  useTastDateState: [
    Date | null,
    React.Dispatch<React.SetStateAction<Date | null>>
  ];
}

export const ExamDatePicker = ({
  useTastDateState,
}: ExamDatePickerProps): JSX.Element => {
  const [examRawDate, setExamRawDate] = useTastDateState;

  const handleDatePicker = (newValue: Date | null | any) => {
    setExamRawDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="시험일"
        value={examRawDate}
        onChange={handleDatePicker}
        renderInput={(params) => {
          const YYYY_MM_DD = new DateFormatting(examRawDate).YYYY_MM_DD;
          const reformParam: TextFieldProps = {
            ...params,
            inputProps: {
              ...params.inputProps,
              value: YYYY_MM_DD,
              onChange: (...arg) => {
                arg[0].preventDefault();
                return arg;
              },
              placeholder: "YYYY-MM-DD",
            },
          };
          return <TextField size="small" sx={{ mb: 2 }} {...reformParam} />;
        }}
      />
    </LocalizationProvider>
  );
};

export default ExamDatePicker;
