import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { SignatureColor } from "../../commonStyles/CommonColor";

interface FilterOptionButtonProps {
  buttonText: string;
}

export const FilterOptionButton = ({
  buttonText,
}: FilterOptionButtonProps): JSX.Element => {
  return (
    <FilterOptionButtonStyle>
      <Typography variant="subtitle2" component="div">
        {buttonText}
      </Typography>
    </FilterOptionButtonStyle>
  );
};

const FilterOptionButtonStyle = styled("button")(({ theme }) => ({
  border: "none",
  height: theme.spacing(3),
  padding: theme.spacing(0.25, 2, 0.25, 2),
  borderRadius: theme.spacing(1.5),

  "&:hover": {
    boxShadow: `0 0 0 1px ${SignatureColor.BLUE} inset`,
  },
}));
