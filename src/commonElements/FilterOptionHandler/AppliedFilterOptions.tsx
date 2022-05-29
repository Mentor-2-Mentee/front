import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
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
    appliedOptions.childElements.length === 0 &&
    appliedOptions.filterKeyword === "";

  useEffect(() => {
    console.log(appliedOptions);
  }, [appliedOptions]);
  return (
    <AppliedFilterOptionsContainer>
      {isNotActivateFilter ? null : (
        <div style={{ display: "flex" }}>
          <Typography variant="subtitle1" component="div">
            {appliedOptions.filterKeyword === ""
              ? null
              : `입력 키워드 : ${appliedOptions.filterKeyword}`}
          </Typography>

          <div>
            {appliedOptions.parentElement === undefined ? null : (
              <FilterOptionButton
                isSelected={true}
                buttonText={appliedOptions.parentElement.describeText}
              />
            )}
          </div>

          <ChevronRightIcon />

          <div className="child">
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
          </div>
        </div>
      )}
    </AppliedFilterOptionsContainer>
  );
};

const AppliedFilterOptionsContainer = styled("div")(({ theme }) => ({
  "& > * > *": {
    marginRight: theme.spacing(1),
  },
}));

export default AppliedFilterOptions;
