import { styled } from "@mui/system";
import { useState } from "react";
import AppliedFilterOptions, {
  AppliedFilterOptionsProps,
} from "./AppliedFilterOptions";
import FilterOptions from "./FilterOptions";
import FilterToggleButton from "./FilterOptionHandlerHeader";
import { FilterOptionElement } from "./filterTreeMapConstructor";
import FilterKeywordInput from "./FilterKeywordInput";
import AppliedKeywords from "./AppliedKeywords";

const ARIA_DESCRIVEDBY = "popOverFilter";

interface FilterOptionHandlerProps {
  filterElements: FilterOptionElement[];
  appliedOptions: AppliedOptions;
  setAppliedOptions: React.Dispatch<React.SetStateAction<AppliedOptions>>;
  tagOnly?: boolean;
}

export interface AppliedOptions {
  parentElement?: Omit<FilterOptionElement, "parentElement">;
  childElements: Omit<FilterOptionElement, "parentElement">[];
  filterKeywords: string[];
}

export const FilterOptionHandler = ({
  filterElements,
  appliedOptions,
  setAppliedOptions,
  tagOnly = false,
}: FilterOptionHandlerProps): JSX.Element => {
  const [anchorElement, setAnchorElement] =
    useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorElement);

  const handleFilterOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorElement(null);
  };

  const cancelFilterKeyword = (target: string) => {
    setAppliedOptions({
      ...appliedOptions,
      filterKeywords: appliedOptions.filterKeywords.filter(
        (keyword) => keyword !== target
      ),
    });
  };

  return (
    <FilterOptionHandlerContainer>
      {!tagOnly && (
        <FilterKeywordInputContainer>
          <FilterKeywordInput
            appliedOptions={appliedOptions}
            setAppliedOptions={setAppliedOptions}
          />
          <AppliedKeywords
            filterKeywords={appliedOptions.filterKeywords}
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
        <AppliedFilterOptions appliedOptions={appliedOptions} />
      </FilterOptionHandlerHeader>

      <FilterOptions
        filterElements={filterElements}
        ARIA_DESCRIVEDBY={ARIA_DESCRIVEDBY}
        isOpen={isOpen}
        isTagging={tagOnly}
        anchorElement={anchorElement}
        handleFilterClose={handleFilterClose}
        appliedOptions={appliedOptions}
        setAppliedOptions={setAppliedOptions}
      />
    </FilterOptionHandlerContainer>
  );
};

const FilterOptionHandlerContainer = styled("div")(({ theme }) => ({}));

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
