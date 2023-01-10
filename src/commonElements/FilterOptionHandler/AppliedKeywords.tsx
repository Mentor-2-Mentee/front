import { Chip, Stack } from "@mui/material";
import { FilterOption } from ".";

interface AppliedKeywordsProps extends Pick<FilterOption, "filterKeywords"> {
  cancelFilterKeyword: (target: string) => void;
}
export const AppliedKeywords = ({
  filterKeywords,
  cancelFilterKeyword,
}: AppliedKeywordsProps): JSX.Element => {
  const deleteAppliedKeyword = (targetKeyword: string) => () => {
    cancelFilterKeyword(targetKeyword);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        m: 1,
        display: "flex",
        flexFlow: "wrap",
        gap: 0.5,
      }}
    >
      {filterKeywords.map((keyword) => {
        return (
          <Chip
            label={keyword}
            onDelete={deleteAppliedKeyword(keyword)}
            variant="outlined"
          />
        );
      })}
    </Stack>
  );
};

export default AppliedKeywords;
