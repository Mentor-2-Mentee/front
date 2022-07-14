import { styled } from "@mui/system";
import { useEffect } from "react";
import { FilterOptionButton } from "./FilterOptionButton";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FilterOption } from ".";
export interface AppliedFilterOptionsProps
  extends Omit<FilterOption, "filterKeywords"> {}

export const AppliedFilterOptions = ({
  rootFilterTag,
  childFilterTags,
}: AppliedFilterOptionsProps): JSX.Element => {
  const isNotActivateFilter: boolean =
    rootFilterTag === undefined && childFilterTags.length === 0;
  return (
    <>
      {isNotActivateFilter ? null : (
        <AppliedFilterOptionsContainer>
          <div>
            {rootFilterTag === undefined ? null : (
              <FilterOptionButton
                isSelected={true}
                buttonText={rootFilterTag}
              />
            )}
          </div>

          {childFilterTags.length === 0 ? null : <ChevronRightIcon />}

          <AppliedChildFilterOptionsContainer>
            {childFilterTags.length === 0
              ? null
              : childFilterTags.map((childFilterTag) => {
                  return (
                    <FilterOptionButton
                      isSelected={true}
                      buttonText={childFilterTag.tagName}
                    />
                  );
                })}
          </AppliedChildFilterOptionsContainer>
        </AppliedFilterOptionsContainer>
      )}
    </>
  );
};

const AppliedFilterOptionsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  "& > *": {
    marginRight: theme.spacing(1),
  },
}));

const AppliedChildFilterOptionsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  "& > *": {
    marginRight: theme.spacing(0.5),
  },
}));

export default AppliedFilterOptions;
