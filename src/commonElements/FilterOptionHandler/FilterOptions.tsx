import { styled } from "@mui/system";
import { Popover, Typography } from "@mui/material";
import { FilterOptionButton } from "./FilterOptionButton";

interface FilterOptionsProps {
  ARIA_DESCRIVEDBY: string;
  isOpen: boolean;
  anchorElement: HTMLButtonElement | null;
  handleFilterClose: () => void;
}

const QUESTION_TYPE = ["기사문제", "NCS", "기업전공", "기타"];
const DETAIL_QUESTION_TYPE = [
  "화공기사",
  "대기환경기사",
  "수질환경기사",
  "가스기사",
];

export const FilterOptions = ({
  ARIA_DESCRIVEDBY,
  isOpen,
  anchorElement,
  handleFilterClose,
}: FilterOptionsProps): JSX.Element => {
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
    >
      <Typography sx={{ p: 2 }}>질문 유형</Typography>

      <TypeButtonContainer>
        {QUESTION_TYPE.map((type) => {
          return <FilterOptionButton buttonText={type} />;
        })}
      </TypeButtonContainer>

      <Typography sx={{ p: 2 }}>세부 유형</Typography>

      <TypeButtonContainer>
        {DETAIL_QUESTION_TYPE.map((type) => {
          return <FilterOptionButton buttonText={type} />;
        })}
      </TypeButtonContainer>

      <Typography sx={{ p: 2 }}>키워드</Typography>
    </Popover>
  );
};

const TypeButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  margin: theme.spacing(0, 2, 0, 2),

  "& > *": {
    marginRight: theme.spacing(1),
  },
}));

export default FilterOptions;
