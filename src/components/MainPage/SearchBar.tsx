import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { CommoneMargin } from "../../commonStyles/margin";
import { SignitureColor } from "../../commonStyles/color";

const SUGGESTION_KEYWORD_LIST_DEV = [
  "화공기사 22년 3회 공정제어",
  "수질기사 19년 1회 필답",
];

export const SearchBar = (): JSX.Element => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputValue = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const handleSuggestionKeyWordClick = (targetValue: string) => {
    setInputValue(targetValue);
  };

  return (
    <SearchBarContainer>
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
          endAdornment: (
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
    </SearchBarContainer>
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

const SearchBarContainer = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(CommoneMargin.PAGE_DEFAULT),
  margin: theme.spacing(
    0,
    CommoneMargin.PAGE_DEFAULT,
    CommoneMargin.PAGE_DEFAULT,
    CommoneMargin.PAGE_DEFAULT
  ),
}));

const SuggestionKeyWordContainer = styled("button")(({ theme }) => ({
  backgroundColor: SignitureColor.GRAY,
  borderRadius: 5,
  margin: theme.spacing(0.5),
  padding: theme.spacing(0.25, 1, 0.25, 1),
  border: `1px solid ${SignitureColor.GRAY_BORDER}`,

  "&:hover": {
    backgroundColor: SignitureColor.BLUE,
    color: SignitureColor.WHITE,
  },
}));

export default SearchBar;
