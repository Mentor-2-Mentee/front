import { styled } from "@mui/system";
import { useState } from "react";
import AppliedFilterOptions from "./AppliedFilterOptions";
import FilterOptions from "./FilterOptions";
import FilterToggleButton from "./FilterOptionHandlerHeader";
import FilterKeywordInput from "./FilterKeywordInput";
import AppliedKeywords from "./AppliedKeywords";
import { QuestionTag } from "../../models";

const ARIA_DESCRIVEDBY = "popoverFilter";

interface FilterOptionHandlerProps {
  tagList: QuestionTag[];
  useFilterOptionState: [
    FilterOption,
    React.Dispatch<React.SetStateAction<FilterOption>>
  ];
  tagOnly?: boolean;
}

export interface FilterOption {
  rootFilterTag?: string;
  childFilterTags: QuestionTag[];
  filterKeywords: string[];
}

export const FilterOptionHandler = ({
  tagList,
  useFilterOptionState,
  tagOnly = false,
}: FilterOptionHandlerProps): JSX.Element => {
  const [filterOption, setFilterOption] = useFilterOptionState;
  const [anchorElement, setAnchorElement] =
    useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorElement);

  const handleFilterOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorElement(null);
  };

  const cancelFilterKeyword = (targetFilterTagName: string) => {
    setFilterOption({
      ...filterOption,
      childFilterTags: filterOption.childFilterTags.filter(
        (childFilterTag) => childFilterTag.tagName !== targetFilterTagName
      ),
      filterKeywords: filterOption.filterKeywords.filter(
        (filterKeyword) => filterKeyword !== targetFilterTagName
      ),
    });
  };

  return (
    <FilterOptionHandlerContainer>
      {!tagOnly && (
        <FilterKeywordInputContainer>
          <FilterKeywordInput
            appliedOptions={filterOption}
            setAppliedOptions={setFilterOption}
          />
          <AppliedKeywords
            filterKeywords={filterOption.filterKeywords}
            cancelFilterKeyword={cancelFilterKeyword}
          />
        </FilterKeywordInputContainer>
      )}

      <FilterOptionHandlerHeader>
        <FilterToggleButton
          ARIA_DESCRIVEDBY={ARIA_DESCRIVEDBY}
          isOpen={isOpen}
          isTagging={tagOnly}
          handleFilterOpen={handleFilterOpen}
        />
        <AppliedFilterOptions
          rootFilterTag={filterOption.rootFilterTag}
          childFilterTags={filterOption.childFilterTags}
        />
      </FilterOptionHandlerHeader>

      <FilterOptions
        tagList={tagList}
        ARIA_DESCRIVEDBY={ARIA_DESCRIVEDBY}
        isOpen={isOpen}
        isTagging={tagOnly}
        anchorElement={anchorElement}
        handleFilterClose={handleFilterClose}
        useFilterOptionState={[filterOption, setFilterOption]}
      />
    </FilterOptionHandlerContainer>
  );
};

const FilterOptionHandlerContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2),
}));

const FilterOptionHandlerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  "& > *": {
    marginRight: theme.spacing(2),
  },
}));

const FilterKeywordInputContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export default FilterOptionHandler;
