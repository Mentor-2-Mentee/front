import { styled } from "@mui/system";
import { InputAdornment, Popover, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FilterOptionButton } from "./FilterOptionButton";
import { SignatureColor } from "../../commonStyles/CommonColor";
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
  const [childFilterOptionList, setChildFilterOptionList] = useState<
    Omit<FilterOptionElement, "parentElement">[]
  >([]);
  const [selectedParent, setSelectedParent] = useState<string>("");
  const [selectedChildren, setSelectedChildren] = useState<
    Omit<FilterOptionElement, "parentElement">[]
  >([]);

  const filterTree = filterTreeMapConstructor(filterElements);
  const parentsTypeList = Array.from(filterTree.keys());

  const handleInputKeywordValue = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(target.value);
  };

  const handleClickFilterOption = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event);
  };

  useEffect(() => {
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
  }, [selectedParent, selectedChildren, inputKeyword]);

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
      <Typography sx={{ p: 2, borderRadius: 10 }}>질문 유형</Typography>

      <TypeButtonContainer>
        {parentsTypeList.map((type) => {
          return (
            <div
              onClick={(event) => {
                if (selectedParent === type) {
                  setSelectedParent("");
                  setSelectedChildren([]);
                  setChildFilterOptionList([]);
                  return;
                }
                if (selectedParent !== type) {
                  setSelectedChildren([]);
                }
                handleClickFilterOption(event);
                setChildFilterOptionList(
                  filterTree.get(type)?.childFilterOptionList || []
                );
                setSelectedParent(type);
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
                // handleClickFilterOption
                if (selectedChildren.indexOf(childOption) !== -1) {
                  setSelectedChildren(
                    selectedChildren.filter(
                      (element) => element !== childOption
                    )
                  );
                  return;
                }
                setSelectedChildren([...selectedChildren, childOption]);
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
