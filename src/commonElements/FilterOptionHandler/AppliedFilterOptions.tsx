import { styled } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FilterOption } from ".";
import { Box, Chip, Stack } from "@mui/material";
export interface AppliedFilterOptionsProps
  extends Omit<FilterOption, "filterKeywords"> {}

export const AppliedFilterOptions = ({
  rootFilterTag,
  childFilterTags,
}: AppliedFilterOptionsProps): JSX.Element => {
  const isNotActivateFilter: boolean =
    rootFilterTag === undefined && childFilterTags.length === 0;
  return (
    <Box sx={{ m: 1 }}>
      {isNotActivateFilter ? null : (
        <AppliedFilterOptionsContainer>
          <Box>
            {rootFilterTag === undefined ? null : (
              <Chip label={rootFilterTag} variant="outlined" />
            )}
          </Box>

          {childFilterTags.length === 0 ? null : (
            <ChevronRightIcon sx={{ mt: 0.5 }} />
          )}

          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              flexFlow: "wrap",
              gap: 0.5,
            }}
          >
            {childFilterTags.length === 0
              ? null
              : childFilterTags.map((childFilterTag) => {
                  return (
                    <Chip label={childFilterTag.tagName} variant="outlined" />
                  );
                })}
          </Stack>
        </AppliedFilterOptionsContainer>
      )}
    </Box>
  );
};

const AppliedFilterOptionsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  "& > *": {
    marginRight: theme.spacing(1),
  },
}));

export default AppliedFilterOptions;
