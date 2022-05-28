import { styled } from "@mui/system";
import { InputAdornment, Popover, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FilterOptionButton } from "./FilterOptionButton";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { useEffect, useState } from "react";

interface FilterOptionsProps {
  ARIA_DESCRIVEDBY: string;
  isOpen: boolean;
  anchorElement: HTMLButtonElement | null;
  handleFilterClose: () => void;
}

const QUESTION_TYPE = ["기사문제", "NCS", "기업전공", "기타"];
const KNIGHT_DETAIL_QUESTION_TYPE = [
  "화공기사",
  "대기환경기사",
  "수질환경기사",
  "가스기사",
];
const NCS_DETAIL_QUESTION_TYPE = [
  "화공기사",
  "대기환경기사",
  "수질환경기사",
  "가스기사",
];

const filterTree = {
  knight: {
    parentTypeText: "기사문제",
    childTypesList: [
      {
        childTypeText: "화공기사",
      },
    ],
  },
};

/**
 * FilterTree = {
 *
 *    "NCS": {
 *      describeText: "NCS문제들",
 *      childFilterOptionList : [
 *          {filterKey: "communication", describeText: "의사소통능력" },
 *          {filterKey: "mathMatic", describeText: "수리능력" },
 *      ]
 *   },
 *
 *
 *
 * }
 *
 */

const FILTER_OPTION_ELEMENTS: FilterOptionElement[] = [
  {
    filterKey: "communication",
    describeText: "의사소통영역",
    parentElement: {
      parentDescribeText: "NCS",
      parentFilterKey: "NCS",
    },
  },
  {
    filterKey: "mathmatic",
    describeText: "수리능력",
    parentElement: {
      parentDescribeText: "NCS",
      parentFilterKey: "NCS",
    },
  },
  {
    filterKey: "questSolve",
    describeText: "문제해결능력",
    parentElement: {
      parentDescribeText: "NCS",
      parentFilterKey: "NCS",
    },
  },
  {
    filterKey: "chemicalKnight",
    describeText: "화공기사",
    parentElement: {
      parentDescribeText: "기사문제",
      parentFilterKey: "knight",
    },
  },
  {
    filterKey: "waterKnight",
    describeText: "수질환경기사",
    parentElement: {
      parentDescribeText: "기사문제",
      parentFilterKey: "knight",
    },
  },
  {
    filterKey: "airKnight",
    describeText: "대기환경기사",
    parentElement: {
      parentDescribeText: "기사문제",
      parentFilterKey: "knight",
    },
  },
  {
    filterKey: "gasKnight",
    describeText: "가스기사",
    parentElement: {
      parentDescribeText: "기사문제",
      parentFilterKey: "knight",
    },
  },
];

interface FilterOptionElement {
  filterKey: string;
  describeText: string;
  parentElement?: {
    parentDescribeText: string;
    parentFilterKey: string;
  };
}
interface FilterTreeElement {
  describeText: string;
  childFilterOptionList?: Omit<FilterOptionElement, "parentElement">[];
}
type FilterTree = Map<string, FilterTreeElement>;

const filterTreeMapConstructor = (
  filterElements: FilterOptionElement[]
): FilterTree => {
  const filterTree: FilterTree = new Map<string, FilterTreeElement>();

  filterElements.map((filterElement) => {
    if (
      filterElement.parentElement &&
      filterTree.get(filterElement.parentElement.parentFilterKey)
    ) {
      filterTree
        .get(filterElement.parentElement.parentFilterKey)
        ?.childFilterOptionList?.push({
          filterKey: filterElement.filterKey,
          describeText: filterElement.describeText,
        });
    }
    if (
      filterElement.parentElement &&
      !filterTree.get(filterElement.parentElement.parentFilterKey)
    ) {
      filterTree.set(filterElement.parentElement.parentFilterKey, {
        describeText: filterElement.parentElement.parentDescribeText,
        childFilterOptionList: [
          {
            filterKey: filterElement.filterKey,
            describeText: filterElement.describeText,
          },
        ],
      });
    }
    if (!filterElement.parentElement) {
      filterTree.set(filterElement.filterKey, {
        describeText: filterElement.describeText,
      });
    }
  });

  console.log("다만들어짐", filterTree);

  return filterTree;
};

export const FilterOptions = ({
  ARIA_DESCRIVEDBY,
  isOpen,
  anchorElement,
  handleFilterClose,
}: FilterOptionsProps): JSX.Element => {
  const [isTextFieldFocus, setIsTextFieldFocus] = useState<boolean>(false);
  const [inputKeyword, setInputKeyword] = useState<string>("");

  const handleInputKeywordValue = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(target.value);
  };

  const [filterTree, setFilterTree] = useState<FilterTree>(
    filterTreeMapConstructor(FILTER_OPTION_ELEMENTS)
  );

  const parentsTypeList = Array.from(filterTree.keys());

  const [childFilterOptionList, setChildFilterOptionList] = useState<
    Omit<FilterOptionElement, "parentElement">[]
  >([]);

  const handleClickFilterOption = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event);
  };

  useEffect(() => {
    console.log(childFilterOptionList);
  }, [childFilterOptionList]);
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
                handleClickFilterOption(event);
                setChildFilterOptionList(
                  filterTree.get(type)?.childFilterOptionList || []
                );
              }}
            >
              <FilterOptionButton
                buttonText={filterTree.get(type)?.describeText || "기타"}
              />
            </div>
          );
        })}
      </TypeButtonContainer>

      <Typography sx={{ p: 2 }}>세부 유형</Typography>

      <TypeButtonContainer>
        {/* {KNIGHT_DETAIL_QUESTION_TYPE.map((type) => {
          return <FilterOptionButton buttonText={type} />;
        })} */}
        {childFilterOptionList.map((childOption) => {
          return (
            <div onClick={handleClickFilterOption}>
              <FilterOptionButton buttonText={childOption.describeText} />
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
