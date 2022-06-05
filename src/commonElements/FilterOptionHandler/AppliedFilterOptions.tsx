import { styled } from "@mui/system";
import { useEffect } from "react";
import { FilterOptionButton } from "./FilterOptionButton";
import { AppliedOptions } from "./index";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
export interface AppliedFilterOptionsProps {
  appliedOptions: AppliedOptions;
}

export const AppliedFilterOptions = ({
  appliedOptions,
}: AppliedFilterOptionsProps): JSX.Element => {
  const isNotActivateFilter: boolean =
    appliedOptions.parentElement === undefined &&
    appliedOptions.childElements.length === 0;
  return (
    <>
      {isNotActivateFilter ? null : (
        <AppliedFilterOptionsContainer>
          <div>
            {appliedOptions.parentElement === undefined ? null : (
              <FilterOptionButton
                isSelected={true}
                buttonText={appliedOptions.parentElement.describeText}
              />
            )}
          </div>

          {appliedOptions.childElements.length === 0 ? null : (
            <ChevronRightIcon />
          )}

          <AppliedChildFilterOptionsContainer>
            {appliedOptions.childElements.length === 0
              ? null
              : appliedOptions.childElements.map((childElement) => {
                  return (
                    <FilterOptionButton
                      isSelected={true}
                      buttonText={childElement.describeText}
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
