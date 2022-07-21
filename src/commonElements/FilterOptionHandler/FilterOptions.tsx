import { styled } from "@mui/system";
import { Popover, Typography } from "@mui/material";
import { FilterOptionButton } from "./FilterOptionButton";
import { useEffect, useState } from "react";
import { tagTreeMapConstructor } from "./tagTreeMapConstructor";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { FilterOption } from ".";
import { QuestionTag } from "../../models";

interface FilterOptionsProps {
  tagList: QuestionTag[];
  ARIA_DESCRIVEDBY: string;
  isOpen: boolean;
  isTagging?: boolean;
  anchorElement: HTMLButtonElement | null;
  handleFilterClose: () => void;
  useFilterOptionState: [
    FilterOption,
    React.Dispatch<React.SetStateAction<FilterOption>>
  ];
}

export const FilterOptions = ({
  tagList,
  ARIA_DESCRIVEDBY,
  isOpen,
  isTagging = false,
  anchorElement,
  handleFilterClose,
  useFilterOptionState,
}: FilterOptionsProps): JSX.Element => {
  const [filterOption, setFilterOption] = useFilterOptionState;
  const [selectedParent, setSelectedParent] =
    useState<string | undefined>(undefined);
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  const tagTree = tagTreeMapConstructor(tagList);
  const parentsFilterTypeList = Array.from(tagTree.keys());
  const [childFilterOptionList, setChildFilterOptionList] = useState<string[]>(
    []
  );

  const handleParentsFilterType = (type: string) => {
    //같은것을 눌러서 선택취소
    if (selectedParent === type) {
      setSelectedParent(undefined);
      setSelectedChildren([]);
      setChildFilterOptionList([]);
      setFilterOption({
        rootFilterTag: undefined,
        childFilterTags: [],
        filterKeywords: [],
      });
      return;
    }
    //다른것을 눌렀을때 자식요소 선택초기화
    if (selectedParent !== type) {
      setSelectedChildren([]);
      setFilterOption({
        ...filterOption,
        rootFilterTag: type,
        childFilterTags: [],
      });
    }
    setChildFilterOptionList(tagTree.get(type)?.childFilterOptionList || []);
    setSelectedParent(type);
  };

  const handleChildrenFilterType = (childOption: string) => {
    if (selectedChildren.indexOf(childOption) !== -1) {
      setSelectedChildren(
        selectedChildren.filter((element) => element !== childOption)
      );
      return;
    }
    setSelectedChildren([...selectedChildren, childOption]);
  };

  const applyCurrentFilterOption = () => {
    setFilterOption({
      ...filterOption,
      rootFilterTag: selectedParent,
      childFilterTags: selectedChildren.map((childTag) => {
        return {
          parentFilterTag: selectedParent,
          tagName: childTag,
        };
      }),
    });
  };

  const resetCurrentFilterOption = () => {
    setSelectedParent(undefined);
    setSelectedChildren([]);
    setFilterOption({
      childFilterTags: [],
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
          {isTagging ? "테그 초기화" : "필터 초기화"}
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
                  buttonText={tagTree.get(type)?.filterKey || "기타"}
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
                  buttonText={childOption}
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
