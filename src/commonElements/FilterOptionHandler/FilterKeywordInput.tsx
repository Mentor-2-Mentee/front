import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { FilterOption } from ".";

interface FilterKeywordInputProps {
  appliedOptions: FilterOption;
  setAppliedOptions: React.Dispatch<React.SetStateAction<FilterOption>>;
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

  const handleKeywordSubmitByEnter = ({
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

  const handleKeywordSubmitByClick = () => {
    if (inputKeyword === "") return;
    setAppliedOptions({
      ...appliedOptions,
      filterKeywords: [...appliedOptions.filterKeywords, inputKeyword],
    });
    setInputKeyword("");
  };

  return (
    <>
      <TextField
        placeholder="검색할 키워드 입력"
        size="small"
        value={inputKeyword}
        onChange={handleInputKeywordValue}
        onKeyUp={handleKeywordSubmitByEnter}
        focused={isTextFieldFocus}
        onFocus={() => {
          setIsTextFieldFocus(true);
        }}
        onBlur={() => {
          setIsTextFieldFocus(false);
        }}
        type="search"
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
