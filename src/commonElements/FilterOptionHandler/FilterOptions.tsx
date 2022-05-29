import { styled } from "@mui/system";
import { InputAdornment, Popover, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FilterOptionButton } from "./FilterOptionButton";
import { useEffect, useState } from "react";
import filterTreeMapConstructor, {
  FilterOptionElement,
} from "./filterTreeMapConstructor";
import { AppliedOptions } from ".";

interface FilterOptionsProps {
  filterElements: FilterOptionElement[];
  ARIA_DESCRIVEDBY: string;
  isOpen: boolean;
  anchorElement: HTMLButtonElement | null;
  handleFilterClose: () => void;
  appliedOptions: AppliedOptions;
  setAppliedOptions: React.Dispatch<React.SetStateAction<AppliedOptions>>;
}

export const FilterOptions = ({
  filterElements,
  ARIA_DESCRIVEDBY,
  isOpen,
  anchorElement,
  handleFilterClose,
  appliedOptions,
  setAppliedOptions,
}: FilterOptionsProps): JSX.Element => {
  const [isTextFieldFocus, setIsTextFieldFocus] = useState<boolean>(false);
  const [inputKeyword, setInputKeyword] = useState<string>("");
  const [selectedParent, setSelectedParent] = useState<string>("");
  const [selectedChildren, setSelectedChildren] = useState<
    Omit<FilterOptionElement, "parentElement">[]
  >([]);

  const filterTree = filterTreeMapConstructor(filterElements);
  const parentsFilterTypeList = Array.from(filterTree.keys());
  const [childFilterOptionList, setChildFilterOptionList] = useState<
    Omit<FilterOptionElement, "parentElement">[]
  >([]);

  const handleInputKeywordValue = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(target.value);
  };

  const handleParentsFilterType = (type: string) => {
    //같은것을 눌러서 선택취소
    if (selectedParent === type) {
      setSelectedParent("");
      setSelectedChildren([]);
      setChildFilterOptionList([]);
      return;
    }
    //다른것을 눌렀을때 자식요소 선택초기화
    if (selectedParent !== type) {
      setSelectedChildren([]);
    }
    setChildFilterOptionList(filterTree.get(type)?.childFilterOptionList || []);
    setSelectedParent(type);
  };

  const handleChildrenFilterType = (
    childOption: Omit<FilterOptionElement, "parentElement">
  ) => {
    if (selectedChildren.indexOf(childOption) !== -1) {
      setSelectedChildren(
        selectedChildren.filter((element) => element !== childOption)
      );
      return;
    }
    setSelectedChildren([...selectedChildren, childOption]);
  };

  const applyCurrentFilterOption = () => {
    setAppliedOptions({
      ...appliedOptions,
      parentElement:
        selectedParent === ""
          ? undefined
          : {
              describeText: filterTree.get(selectedParent)!.describeText,
              filterKey: selectedParent,
            },
      childElements: selectedChildren,
      filterKeyword: inputKeyword,
    });
  };

  useEffect(applyCurrentFilterOption, [
    selectedParent,
    selectedChildren,
    inputKeyword,
  ]);

  return (
    <Popover
      id={ARIA_DESCRIVEDBY}
      open={isOpen}
      anchorEl={anchorElement}
      onClose={handleFilterClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        "& > *": {
          marginTop: 2,
          borderRadius: 6,
        },
      }}
    >
      <Typography sx={{ p: 2 }}>질문 유형</Typography>
      <TypeButtonContainer>
        {parentsFilterTypeList.map((type) => {
          return (
            <div
              onClick={() => {
                handleParentsFilterType(type);
              }}
            >
              <FilterOptionButton
                isSelected={selectedParent === type}
                buttonText={filterTree.get(type)?.describeText || "기타"}
              />
            </div>
          );
        })}
      </TypeButtonContainer>

      <Typography sx={{ p: 2 }}>세부 유형</Typography>
      <TypeButtonContainer>
        {childFilterOptionList.map((childOption) => {
          return (
            <div
              onClick={() => {
                handleChildrenFilterType(childOption);
              }}
            >
              <FilterOptionButton
                isSelected={selectedChildren.indexOf(childOption) !== -1}
                buttonText={childOption.describeText}
              />
            </div>
          );
        })}
      </TypeButtonContainer>

      <Typography sx={{ p: 2 }}>키워드</Typography>
      <TextField
        placeholder="검색할 키워드 입력"
        size="small"
        value={inputKeyword}
        onChange={handleInputKeywordValue}
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
        variant="outlined"
        sx={{
          ml: 4,
          mb: 2,
          pr: 4,
        }}
      />
    </Popover>
  );
};

const TypeButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  margin: theme.spacing(0, 4, 0, 4),

  "& > *": {
    marginRight: theme.spacing(1),
  },
}));

export default FilterOptions;
