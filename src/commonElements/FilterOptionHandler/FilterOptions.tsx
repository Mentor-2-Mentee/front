import { styled } from "@mui/system";
import { Popover, Typography } from "@mui/material";
import { FilterOptionButton } from "./FilterOptionButton";
import { useEffect, useState } from "react";
import filterTreeMapConstructor, {
  FilterOptionElement,
} from "./filterTreeMapConstructor";
import { AppliedOptions } from ".";
import { SignatureColor } from "../../commonStyles/CommonColor";

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
  const [selectedParent, setSelectedParent] = useState<string>("");
  const [selectedChildren, setSelectedChildren] = useState<
    Omit<FilterOptionElement, "parentElement">[]
  >([]);

  const filterTree = filterTreeMapConstructor(filterElements);
  const parentsFilterTypeList = Array.from(filterTree.keys());
  const [childFilterOptionList, setChildFilterOptionList] = useState<
    Omit<FilterOptionElement, "parentElement">[]
  >([]);

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
    });
  };

  const resetCurrentFilterOption = () => {
    setSelectedParent("");
    setSelectedChildren([]);
    setAppliedOptions({
      childElements: [],
      filterKeywords: [],
    });
  };

  useEffect(applyCurrentFilterOption, [selectedParent, selectedChildren]);

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
      <PopoverContainer>
        <Typography
          variant="subtitle1"
          component="div"
          onClick={resetCurrentFilterOption}
          sx={{
            color: SignatureColor.RED,
            display: "inline-block",
            fontWeight: "bold",
            borderRadius: 5,
            pl: 1,
            pr: 1,
            "&:hover": {
              color: SignatureColor.WHITE,
              backgroundColor: SignatureColor.RED,
            },
          }}
        >
          필터 초기화
        </Typography>
        <Typography variant="subtitle1" component="div" sx={{ pl: 1, pr: 1 }}>
          질문 유형
        </Typography>
        <TypeButtonContainer>
          {parentsFilterTypeList.map((type, index) => {
            return (
              <div
                onClick={() => {
                  handleParentsFilterType(type);
                }}
                key={index}
              >
                <FilterOptionButton
                  isSelected={selectedParent === type}
                  buttonText={filterTree.get(type)?.describeText || "기타"}
                />
              </div>
            );
          })}
        </TypeButtonContainer>

        <Typography variant="subtitle1" component="div" sx={{ pl: 1, pr: 1 }}>
          세부 유형
        </Typography>
        <TypeButtonContainer>
          {childFilterOptionList.map((childOption, index) => {
            return (
              <div
                onClick={() => {
                  handleChildrenFilterType(childOption);
                }}
                key={index}
              >
                <FilterOptionButton
                  isSelected={selectedChildren.indexOf(childOption) !== -1}
                  buttonText={childOption.describeText}
                />
              </div>
            );
          })}
        </TypeButtonContainer>
      </PopoverContainer>
    </Popover>
  );
};

const PopoverContainer = styled("div")(({ theme }) => ({
  maxWidth: "50vw",
  padding: theme.spacing(2),
  "& > *": {
    margin: theme.spacing(2),
  },
}));

const TypeButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginLeft: theme.spacing(4),

  "& > *": {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default FilterOptions;
