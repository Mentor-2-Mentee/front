import { styled } from "@mui/system";
import { useState } from "react";
import AppliedFilterOptions, {
  AppliedFilterOptionsProps,
} from "./AppliedFilterOptions";
import FilterOptions from "./FilterOptions";
import FilterToggleButton from "./FilterOptionHandlerHeader";
import { FilterOptionElement } from "./filterTreeMapConstructor";

const ARIA_DESCRIVEDBY = "popOverFilter";

interface FilterOptionHandlerProps {
  filterElements: FilterOptionElement[];
}

export interface AppliedOptions {
  parentElement?: Omit<FilterOptionElement, "parentElement">;
  childElements: Omit<FilterOptionElement, "parentElement">[];
  filterKeyword: string;
}

export const FilterOptionHandler = ({
  filterElements,
}: FilterOptionHandlerProps): JSX.Element => {
  const [appliedOptions, setAppliedOptions] = useState<AppliedOptions>({
    parentElement: undefined,
    childElements: [],
    filterKeyword: "",
  });
  const [anchorElement, setAnchorElement] =
    useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorElement);

  const handleFilterOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorElement(null);
  };

  return (
    <FilterOptionHandlerContainer>
      <FilterOptionHandlerHeader>
        <FilterToggleButton
          ARIA_DESCRIVEDBY={ARIA_DESCRIVEDBY}
          isOpen={isOpen}
          handleFilterOpen={handleFilterOpen}
        />
        <AppliedFilterOptions appliedOptions={appliedOptions} />
      </FilterOptionHandlerHeader>

      <FilterOptions
        filterElements={filterElements}
        ARIA_DESCRIVEDBY={ARIA_DESCRIVEDBY}
        isOpen={isOpen}
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

export default FilterOptionHandler;
