import { styled } from "@mui/system";
import { useState } from "react";
import AppliedFilterOptions from "./AppliedFilterOptions";
import FilterOptions from "./FilterOptions";
import FilterToggleButton from "./FilterOptionHandlerHeader";

const ARIA_DESCRIVEDBY = "popOverFilter";
export const FilterOptionHandler = (): JSX.Element => {
  const [appliedOptions, setAppliedOptions] = useState();
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
        <AppliedFilterOptions />
      </FilterOptionHandlerHeader>

      <FilterOptions
        ARIA_DESCRIVEDBY={ARIA_DESCRIVEDBY}
        isOpen={isOpen}
        anchorElement={anchorElement}
        handleFilterClose={handleFilterClose}
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
