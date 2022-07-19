import { styled } from "@mui/system";
import { Chip, Stack, Typography } from "@mui/material";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { FilterOptionButton } from "./FilterOptionButton";
import ClearIcon from "@mui/icons-material/Clear";
import { FilterOption } from ".";

interface AppliedKeywordsProps extends Pick<FilterOption, "filterKeywords"> {
  cancelFilterKeyword: (target: string) => void;
}
export const AppliedKeywords = ({
  filterKeywords,
  cancelFilterKeyword,
}: AppliedKeywordsProps): JSX.Element => {
  const deleteAppliedKeyword = (targetKeyword: string) => {
    cancelFilterKeyword(targetKeyword);
  };

  return (
    <Stack direction="row" spacing={1} sx={{ ml: 2 }}>
      {filterKeywords.map((keyword) => {
        return (
          <Chip
            label={keyword}
            onDelete={() => {
              deleteAppliedKeyword(keyword);
            }}
            variant="outlined"
          />
        );
      })}
    </Stack>
  );
};

export default AppliedKeywords;
