import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { CommonSpace } from "../../../commonStyles/CommonSpace";
import { SignatureColor } from "../../../commonStyles/CommonColor";

const SUGGESTION_KEYWORD_LIST_DEV = [
  "화공기사 22년 3회 공정제어",
  "수질기사 19년 1회 필답",
];

export const SearchBar = (): JSX.Element => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const isWidthShort = useMediaQuery("(max-width:900px)");

  const handleInputValue = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const handleSuggestionKeyWordClick = (targetValue: string) => {
    setInputValue(targetValue);
  };

  return (
    <Box
      sx={(theme) => ({
        margin: isWidthShort
          ? theme.spacing(0, 4, 4, 4)
          : theme.spacing(0, 8, 8, 8),
        paddingTop: isWidthShort
          ? theme.spacing(4)
          : theme.spacing(CommonSpace.PADDING),
      })}
    >
      <TextField
        placeholder="질문할 문제를 찾아보세요"
        fullWidth
        size="medium"
        value={inputValue}
        onChange={handleInputValue}
        focused={isFocus}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: isWidthShort ? null : (
            <InputAdornment position="end">
              {inputValue === "" &&
                SUGGESTION_KEYWORD_LIST_DEV.map((keyword, index) => {
                  return (
                    <SuggestionKeyWord
                      key={index}
                      keyword={keyword}
                      handleSuggestionKeyWordClick={
                        handleSuggestionKeyWordClick
                      }
                      setIsFocus={setIsFocus}
                    />
                  );
                })}
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      {inputValue !== "" &&
        SUGGESTION_KEYWORD_LIST_DEV.map((keyword, index) => {
          return (
            <SuggestionKeyWord
              key={index}
              keyword={keyword}
              handleSuggestionKeyWordClick={handleSuggestionKeyWordClick}
              setIsFocus={setIsFocus}
            />
          );
        })}
    </Box>
  );
};

interface SuggestionKeyWordProps {
  keyword: string;
  handleSuggestionKeyWordClick: (targetValue: string) => void;
  setIsFocus: (value: React.SetStateAction<boolean>) => void;
}

const SuggestionKeyWord = ({
  keyword,
  handleSuggestionKeyWordClick,
  setIsFocus,
}: SuggestionKeyWordProps): JSX.Element => {
  return (
    <SuggestionKeyWordContainer
      onClick={() => {
        handleSuggestionKeyWordClick(keyword);
        setIsFocus(true);
      }}
    >
      {keyword}
    </SuggestionKeyWordContainer>
  );
};

const SuggestionKeyWordContainer = styled("button")(({ theme }) => ({
  backgroundColor: SignatureColor.GRAY,
  borderRadius: 5,
  margin: theme.spacing(0.5),
  padding: theme.spacing(0.25, 1, 0.25, 1),
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,

  "&:hover": {
    backgroundColor: SignatureColor.BLUE,
    color: SignatureColor.WHITE,
  },
}));

export default SearchBar;
