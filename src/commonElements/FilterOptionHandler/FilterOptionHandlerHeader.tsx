import { styled } from "@mui/system";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { Typography } from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface FilterToggleButtonProps {
  ARIA_DESCRIVEDBY: string;
  isOpen: boolean;
  isTagging?: boolean;
  handleFilterOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FilterToggleButton = ({
  ARIA_DESCRIVEDBY,
  isOpen,
  isTagging = false,
  handleFilterOpen,
}: FilterToggleButtonProps): JSX.Element => {
  return (
    <FilterToggleButtonStyle
      aria-describedby={ARIA_DESCRIVEDBY}
      onClick={handleFilterOpen}
    >
      <TuneIcon sx={{ transform: "rotate(90deg)" }} />
      <Typography variant="subtitle2" component="div">
        {isTagging ? "Tag" : "Filter"}
      </Typography>
      {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </FilterToggleButtonStyle>
  );
};

const FilterToggleButtonStyle = styled("button")(({ theme }) => ({
  display: "flex",
  border: `1px solid ${SignatureColor.BLUE}`,

  borderRadius: theme.spacing(2),
  alignItems: "center",
  backgroundColor: SignatureColor.WHITE,

  "& > *": {
    margin: theme.spacing(0.5),
  },
}));

export default FilterToggleButton;
