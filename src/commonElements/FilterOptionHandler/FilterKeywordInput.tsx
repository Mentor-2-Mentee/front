import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { AppliedOptions } from ".";

interface FilterKeywordInputProps {
  appliedOptions: AppliedOptions;
  setAppliedOptions: React.Dispatch<React.SetStateAction<AppliedOptions>>;
}

export const FilterKeywordInput = ({
  appliedOptions,
  setAppliedOptions,
}: FilterKeywordInputProps): JSX.Element => {
  const [isTextFieldFocus, setIsTextFieldFocus] = useState<boolean>(false);
  const [inputKeyword, setInputKeyword] = useState<string>("");

  const handleInputKeywordValue = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(target.value);
  };

  const handleInputKeywordSubmit = ({
    key,
  }: React.KeyboardEvent<HTMLDivElement>) => {
    if (inputKeyword !== "" && key === "Enter") {
      setAppliedOptions({
        ...appliedOptions,
        filterKeywords: [...appliedOptions.filterKeywords, inputKeyword],
      });
      setInputKeyword("");
    }
  };

  return (
    <>
      <TextField
        placeholder="검색할 키워드 입력"
        size="small"
        value={inputKeyword}
        onChange={handleInputKeywordValue}
        onKeyUp={handleInputKeywordSubmit}
        focused={isTextFieldFocus}
        onFocus={() => {
          setIsTextFieldFocus(true);
        }}
        onBlur={() => {
          setIsTextFieldFocus(false);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          minWidth: 200,
        }}
        variant="outlined"
      />
    </>
  );
};

export default FilterKeywordInput;
